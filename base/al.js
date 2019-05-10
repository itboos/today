/* eslint-disable one-var */
/* eslint-disable2 */
/*
 * onError -> 拦截 throw 等抛出的错误， 较为严重的错误。
 * console.error -> 脚本里的输出错误
 *  111
 *  错误信息的处理, 错误信息很长的时候限制长度
 *
 *
*/
/**
 * track 事件参数定义:
 * { type: 'track',  event: 'pageScroll',  time: 123456,  project: 'reservation', data: {} }
 * report 错误事件定义:
 *  1.错误上报      { type: 'report',  event: 'error',  time: 123456,  project: 'reservation', data: {} }
 *  2.性能数据上报:  { type: 'report',  event: 'performance',  time: 123456,  project: 'reservation', data: {} }
 * */
var smConfig = {
  project: 'reservation',
  trackBase: 'https://pingtas.qq.com/pingd',
  reportBase: 'https://pingtas.qq.com/pingd',
  version: '0.1',
  prefix: '_sma_',
  errorReport: true, // 是否开启错误上报
  requestReport: true,
  statShareApp: true, // 分享
  statPullDown: true,
  statPageScroll: true,
  maxReportNum: 1 // 当次上报最大条数
  // stat_reach_bottom: !1
}
const eventMap = {
  pageView: 'pageView', //  页面停留时间
  pageScroll: 'pageScroll', // 页面滚动事件
  pullDownRefresh: 'pullDownRefresh',
  wxRequest: 'wxRequest', // 微信请求事件
  wxShare: 'wxShare', // 微信分享
  onWarn: 'onWarn', // console.warn
  onError: 'onError', // error 相关
  downloadFile: 'downloadFile'
}
// 工具函数
const smaUtils = {
  getTime: function () {
    return (new Date()).getTime()
  },
  getPagePath: function() {
    try {
      /* global getCurrentPages */
      const routers = getCurrentPages()
      let currRoute = '/'
      routers.length > 0 && (currRoute = routers.pop().route)
      return currRoute
    } catch (e) {
      console.log('get current page path error:' + e)
    }
  },
  getSystemInfo: function() {
    const a = wx.getSystemInfoSync()
    return {
      model: encodeURIComponent(a.model),
      scl: a.pixelRatio,
      scr: a.windowWidth + 'x' + a.windowHeight,
      lg: a.language,
      version: a.version,
      system: encodeURIComponent(a.system),
      platform: encodeURIComponent(a.platform),
      sdk_version: a.SDKVersion
    }
  },
  getNetworkType: function(callback) {
    wx.getNetworkType({
      success: function (b) {
        console.log('网络状态：', b)
        callback(b.networkType)
      }
    })
  },
  setBasicInfo: function() {
    // let baseInfo = smaUtils.getSystemInfo()
    let baseInfo = {}
    smaUtils.getNetworkType(function (res) {
      SMA.Data.baseInfo.network = res
      // console.log('基本信息：', SMA.Data.baseInfo)
    })
    SMA.Data.baseInfo = baseInfo
    // 监听网络变化
    wx.onNetworkStatusChange(function (e) {
      SMA.Data.baseInfo.network = e.networkType
    })
  },
  request: function(type = 'trackData') {
    const url = type === 'trackData' ? smConfig.trackBase : smConfig.reportBase
    // type: trackData, errorReport
    const data = type === 'trackData' ? SMA.Data.staData : SMA.Data.errorData
    const sendData = data.slice(0, smConfig.maxReportNum)
    wx.request({
      url,
      data: sendData,
      method: 'POST',
      success: (res) => {
        console.log('success....', res)
        if (res.statusCode === 200) {
          // 删除已经发送成功的数据
          if (type === 'trackData') {
            SMA.Data.staData.splice(0, smConfig.maxReportNum)
          } else if (type === 'errorData') {
            SMA.Data.errorData.splice(0, smConfig.maxReportNum)
          }
        } else {
          console.log('http get error:', res)
        }
      }
    })
  },
  log: function(errno, msg) {
    msg = msg || ''
    const ERRORMAP = {
      1001: 'SMA is already defined, Fail to start!'
    }
    ERRORMAP[errno] && console.warn(['Error(SMA):', ERRORMAP[errno], '(CODE' + errno + ')'].join(' '))
  },
  composeData: function(type, data) {
    return {
      type,
      project: smConfig.project,
      network: SMA.Data.baseInfo.network,
      version: smConfig.version,
      time: smaUtils.getTime(),
      data
    }
  },
  composeErrorData: function(type, data) {}
}

function rePlacePage() {
  /* global Page */
  let oPage = Page
  // eslint-disable-next-line
  Page = function () {
    let args = arguments
    // console.log('args:', args)
    let oOnShow = args[0].onShow,
      oOnHide = args[0].onHide,
      beginTime = 0,
      currRoute = ''
      // 重写onShow
    args[0].onShow = function () {
      console.log('拦截的onShow.....')
      beginTime = smaUtils.getTime()
      oOnShow && oOnShow.call(this, arguments)
    }
     // 重写onHide
    args[0].onHide = function () {
      console.log('拦截的onHide....')
      currRoute = smaUtils.getPagePath()
      let stayTime = smaUtils.getTime() - beginTime
      SMA.track({ event: eventMap.pageView, stayTime, scrollTop: SMA.Data.scrollTop, route: currRoute })
      SMA.Data.scrollTop = 0
      oOnHide && oOnHide.call(this, arguments)
      // 是否在onHide里发送数据
      smaUtils.request()
      // smaUtils.request('errorData')
    }

    // onShare
    if (smConfig.statShareApp && args[0].onShareAppMessage) {
      const oOnShareAppMessage = args[0].onShareAppMessage
      args[0].onShareAppMessage = function () {
        console.log('用户分享...', arguments)
        currRoute = smaUtils.getPagePath()
        SMA.track({ event: eventMap.wxShare, route: currRoute })
        oOnShareAppMessage.call(this, arguments)
      }
    }

     // onPullDownRefresh
    if (smConfig.statPullDown && args[0].onPullDownRefresh) {
      const oOnPullDownRefresh = args[0].onPullDownRefresh
      args[0].onPullDownRefresh = function () {
        currRoute = smaUtils.getPagePath()
        console.log('用户下拉刷新...', arguments, currRoute)
        SMA.track({ event: eventMap.pullDownRefresh, route: currRoute })
        // 发送分享信息
        oOnPullDownRefresh.call(this, arguments)
      }
    }

    // onPageScroll
    if (smConfig.statPageScroll && args[0].onPageScroll) {
      const oOnPageScroll = args[0].onPageScroll
      args[0].onPageScroll = function(e) {
        console.log('页面滚动:', e, e.scrollTop)
        // 只记录页面滚动历史中的最大值
        if (e.scrollTop > SMA.Data.pageScrollTop) {
          SMA.Data.pageScrollTop = e.scrollTop
        }
        oOnPageScroll.call(this, arguments)
      }
    }

    oPage.apply(null, [].slice.call(arguments))
  }

  // 重写APP
  /* global App */
  let oApp = App
  // eslint-disable-next-line
  App = function () {
    let args = arguments
    if (smConfig.errorReport) {
      let oOnError = args[0].onError
      args[0].onError = function () {
        console.log('onError.....')
        // 此类onError 即时上报
        const currRoute = smaUtils.getPagePath()
        console.log('拦截的onError', arguments[0])
        SMA.report({ event: eventMap.onError, route: currRoute, errrMsg: arguments[0] })
        oOnError && oOnError.apply(this, [].slice.call(arguments))
      }

      // 拦截console.warn, console.error
      if (console) {
        const oldWarn = console.warn,
          oldError = console.error
        console.warn = function() {
          const e = [].slice.call(arguments)
          if (!e.length) { return true }
          const currRoute = smaUtils.getPagePath()
          SMA.report({ event: eventMap.onWarn, route: currRoute, errrMsg: arguments[0] })
          // 上传警告
          console.log('捕捉到warn 事件,', e)
          oldWarn.apply(console, e)
        }
        console.error = function() {
          var e = [].slice.call(arguments)
          if (!e.length) { return true }
          const currRoute = smaUtils.getPagePath()
          SMA.report({ event: eventMap.onError, route: currRoute, errrMsg: arguments[0] })
          console.log('捕捉到error 事件,', e)
          oldError.apply(console, e)
        }
      }
    }
    if (smConfig.requestReport) {
      let Request = {
        request: function (e) {
          let success = e[0].success,
            fail = e[0].fail,
            beginTime = smaUtils.getTime(),
            endTime = 0
          e[0].success = function () {
            endTime = smaUtils.getTime()
            const performance = {
              event: eventMap.wxRequest,
              url: e[0].url,
              status: arguments[0].statusCode,
              begin: beginTime,
              end: endTime,
              total: endTime - beginTime
            }
            console.log('success performance:', performance)
            SMA.track(performance)
            success && success.apply(this, [].slice.call(arguments))
          }
          e[0].fail = function () {
            console.log('请求失败：', arguments)
            endTime = smaUtils.getTime()
            const performance = {
              event: eventMap.wxRequest,
              url: e[0].url,
              status: arguments[0].statusCode,
              begin: beginTime,
              end: endTime,
              total: endTime - beginTime
            }
            console.log('fail performance:', performance)
            SMA.track(performance)
            fail && fail.apply(this, [].slice.call(arguments))
          }
        },
        downloadFile: function (e) {
          // wx.downloadFile
          let success = e[0].success,
            fail = e[0].fail,
            beginTime = smaUtils.getTime(),
            endTime = 0
          e[0].success = function (e) {
            endTime = smaUtils.getTime()
            const reportData = {
              type: eventMap.downloadFile,
              url: e[0].url,
              total: endTime - beginTime
            }
            SMA.track(reportData)
            console.log('下载成功：', e, reportData)
            success && success.apply(this, [].slice.call(arguments))
          }
          e[0].fail = function (e) {
            const reportData = {
              type: eventMap.downloadFile,
              url: e[0].url,
              desc: 'fail'
            }
            SMA.track(reportData)
            console.log('下载失败：', e, reportData)
            fail && fail.apply(this, [].slice.call(arguments))
          }
        }
      }

      // 替换微信相关属性
      if (!wx.smTracker) {
        let oldWx = wx,
          newWx = {}
        for (var p in wx) {
          if (Request[p]) {
            let p2 = p.toString()
            newWx[p2] = function () {
              Request[p2](arguments)
              oldWx[p2].apply(oldWx, [].slice.call(arguments))
            }
          } else {
            newWx[p] = oldWx[p]
          }
        }
        newWx.smTracker = true
        // eslint-disable-next-line
        wx = newWx
      } else {
        smaUtils.log(1001)
      }
    }
    // 注入 SMA
    args[0].SMA = SMA
    console.log('args:', args)
    oApp.apply(null, [].slice.call(arguments))
  }
}

const SMA = {
  init: function(config = {}) {
    if (wx.smTracker) {
      return smaUtils.log(1001)
    }
    smConfig = Object.assign({}, smConfig, config)
    smaUtils.setBasicInfo()
    // 拦截Page, App 全局方法
    rePlacePage()
    // 定时发送？
    // SMA.Data.reportTimer = setInterval(() => {
    //   console.log('this.SMA.Data.staData:', this.Data.staData)
    //   if (SMA.Data.staData.length) {
    //     smaUtils.request()
    //   }
    // }, 1000 * 2000)
  },
  // 事件跟踪
  track: function(data) {
    console.log('数据跟踪.....', data)
    SMA.Data.staData.push(smaUtils.composeData('track', data))
  },
  // 错误上报
  report: function(data) {
    // 这里为什么死循环了
    console.log('错误上报。。。。1')
    SMA.Data.errorData.push(smaUtils.composeData('report', data))
    console.log('错误上报。。。。2')
    smaUtils.request('errorData')
  },
  Data: {
    reportTimer: -1,
    userInfo: null,
    baseInfo: null,
    lanuchInfo: null,
    staData: [], // 统计数据
    errorData: [], // 错误数据
    pageScrollTop: 0
  }
}

export default SMA
