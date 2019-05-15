/* eslint-disable one-var */
/*
 * onError -> 拦截 throw 等抛出的错误， 较为严重的错误。
 * console.error -> 脚本里的输出错误
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
  showLog: false,
  autoTrack: true,
  errorReport: true, // 是否开启错误上报
  requestReport: true,
  maxReportNum: 1 // 当次上报最大条数
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
    // 目前小程序在cookie里带上了系统信息，所以无需再次获取
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
        smaUtils.logInfo('success....', res)
        if (res.statusCode === 200) {
          // 删除已经发送成功的数据
          if (type === 'trackData') {
            SMA.Data.staData.splice(0, smConfig.maxReportNum)
          } else if (type === 'errorData') {
            SMA.Data.errorData.splice(0, smConfig.maxReportNum)
          }
        } else {
          smaUtils.logInfo('http get error:', res)
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
  logInfo: function() {
    if (smConfig.showLog) {
      if (typeof console === 'object' && console.log) {
        try {
          return console.log.apply(console, arguments)
        } catch (e) {
          console.log(arguments[0])
        }
      }
    }
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

function autoTrack () {
  let beginTime = 0,
    currRoute = ''
  function e(t, n, o) {
    if (t[n]) {
      let e = t[n]
      t[n] = function (t) {
        // 原始方法调用
        e.call(this, t)
        // 用户添加方法调用
        o.call(this, t, n)
      }
    } else {
      t[n] = function (t) {
        o.call(this, t, n)
      }
    }
  }
  function appShow(pram) {
    smaUtils.logInfo('拦截的appOnShow.....')
    beginTime = smaUtils.getTime()
  }
  function appHide(pram) {
    let stayTime = (smaUtils.getTime() - beginTime).toFixed(1)
    smaUtils.logInfo('appOnHide.....', stayTime)
  }
  function appLaunch(para) {
    // 统计启动时的场景值
    const scene = para.scene || -1
    smaUtils.logInfo('appLaunch...场景值', scene)
  }
  function appError(e) {
    const currRoute = smaUtils.getPagePath()
    const data = { event: eventMap.onError, route: currRoute, errrMsg: e }
    smaUtils.logInfo('拦截的onError', data)
  }
  function onLoad(para) {
    smaUtils.logInfo('pageOnLoad', para)
  }
  function onShow(para, n) {
    smaUtils.logInfo('拦截的onShow.....')
    beginTime = smaUtils.getTime()
  }
  function onHide(para) {
    currRoute = smaUtils.getPagePath()
    let stayTime = smaUtils.getTime() - beginTime
    SMA.track({ event: eventMap.pageView, stayTime, scrollTop: SMA.Data.scrollTop, route: currRoute })
    SMA.Data.scrollTop = 0
    smaUtils.logInfo('拦截的onHide....stayTime', stayTime, wx.smTracker)
    // 是否在onHide里发送数据
    smaUtils.request()
  }
  function onPullDownRefresh(para) {
    currRoute = smaUtils.getPagePath()
    smaUtils.logInfo('用户下拉刷新...', arguments, currRoute)
    SMA.track({ event: eventMap.pullDownRefresh, route: currRoute })
    // 发送下拉舒心信息
  }
  function onReachBottom() {
    currRoute = smaUtils.getPagePath()
    smaUtils.logInfo('下拉接触到底部...', arguments, currRoute)
    SMA.track({ event: 'reachBottom', route: currRoute })
  }
  function onShareAppMessage(para) {
    smaUtils.logInfo('用户分享...', arguments)
    currRoute = smaUtils.getPagePath()
    SMA.track({ event: eventMap.wxShare, route: currRoute })
  }
  function onPageScroll(e) {
    smaUtils.logInfo('页面滚动:', e, e.scrollTop)
    // 只记录页面滚动历史中的最大值
    if (e.scrollTop > SMA.Data.pageScrollTop) {
      SMA.Data.pageScrollTop = e.scrollTop
    }
  }
  /* global App */
  const oldApp = App
  // eslint-disable-next-line
  App = function (t) {
    smaUtils.logInfo('APP:', t)
    e(t, 'onLaunch', appLaunch)
    e(t, 'onShow', appShow)
    e(t, 'onHide', appHide)
    if (smConfig.errorReport) {
      e(t, 'onError', appError)
    }
    oldApp(t)
  }
  /* global Page */
  const oldPage = Page
  // eslint-disable-next-line
  Page = function(option) {
    e(option, 'onLoad', onLoad)
    e(option, 'onShow', onShow)
    e(option, 'onHide', onHide)
    option.onPullDownRefresh && e(option, 'onPullDownRefresh', onPullDownRefresh)
    option.onReachBottom && e(option, 'onReachBottom', onReachBottom)
    option.onShareAppMessage && e(option, 'onShareAppMessage', onShareAppMessage)
    option.onPageScroll && e(option, 'onPageScroll', onPageScroll)
    oldPage.apply(null, [].slice.call(arguments))
  }
  // 注入 SMA
  wx.smTracker = SMA
}
// 错误和接口性能上报初始化
function otherReportInit() {
  // 错误上报 拦截console.warn, console.error
  if (console && smConfig.errorReport) {
    const oldWarn = console.warn,
      oldError = console.error
    console.warn = function() {
      const e = [].slice.call(arguments)
      if (!e.length) { return true }
      const currRoute = smaUtils.getPagePath()
      // SMA.report({ event: eventMap.onWarn, route: currRoute, errrMsg: arguments[0] })
      // 上传警告
      smaUtils.logInfo('捕捉到warn 事件,', e)
      oldWarn.apply(console, e)
    }
    console.error = function() {
      var e = [].slice.call(arguments)
      if (!e.length) { return true }
      const currRoute = smaUtils.getPagePath()
      // SMA.report({ event: eventMap.onError, route: currRoute, errrMsg: arguments[0] })
      smaUtils.logInfo('捕捉到error 事件,', e)
      oldError.apply(console, e)
    }
  }
  // 请求上报
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
          smaUtils.logInfo('success performance:', performance)
          SMA.track(performance)
          success && success.apply(this, [].slice.call(arguments))
        }
        e[0].fail = function () {
          endTime = smaUtils.getTime()
          const performance = {
            event: eventMap.wxRequest,
            url: e[0].url,
            status: arguments[0].statusCode,
            begin: beginTime,
            end: endTime,
            total: endTime - beginTime
          }
          smaUtils.logInfo('fail performance:', performance)
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
          smaUtils.logInfo('下载成功：', e, reportData)
          success && success.apply(this, [].slice.call(arguments))
        }
        e[0].fail = function (e) {
          const reportData = {
            type: eventMap.downloadFile,
            url: e[0].url,
            desc: 'fail'
          }
          SMA.track(reportData)
          smaUtils.logInfo('下载失败：', e, reportData)
          fail && fail.apply(this, [].slice.call(arguments))
        }
      }
    }

    // 替换微信相关属性
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
    // eslint-disable-next-line
    wx = newWx
  } else {
    smaUtils.log(1001)
  }
}
const SMA = {
  init: function(config = {}) {
    if (wx.smTracker) {
      return smaUtils.log(1001)
    }
    smConfig = Object.assign({}, smConfig, config)
    smaUtils.setBasicInfo()
    smConfig.autoTrack && autoTrack()
    otherReportInit()
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
    smaUtils.logInfo('数据跟踪.....', data)
    SMA.Data.staData.push(smaUtils.composeData('track', data))
  },
  // 错误上报
  report: function(data) {
    // 这里为什么死循环了
    smaUtils.logInfo('错误上报。。。。1')
    SMA.Data.errorData.push(smaUtils.composeData('report', data))
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
