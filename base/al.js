/* eslint-disable one-var */
/* eslint-disable2 */
var SMA_CONFIG = {
  app_id: '123456', //
  event_id: '',
  api_base: 'https://pingtas.qq.com/pingd',
  version: '0.1',
  prefix: '_sma_',
  error_report: false, // 是否开启错误上报
  stat_share_app: true // 分享
  // stat_pull_down_fresh: !1,
  // stat_reach_bottom: !1
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
    let baseInfo = smaUtils.getSystemInfo()
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
  request: function(url) {
    wx.request({
      url,
      data: {
        base: SMA.Data.baseInfo,
        userInfo: SMA.Data.userInfo,
        logArr: SMA.Data.logArr
      },
      method: 'POST',
      success: (res) => {
        console.log('success....', res)
        if (res.statusCode === 200) {
          // 清空log数据
          SMA.Data.logArr = []
        } else {
          console.error('http get error:', res)
        }
      }
    })
  }
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
      currRoute = smaUtils.getPagePath()
      beginTime = smaUtils.getTime()
      oOnShow && oOnShow.call(this, arguments)
      // 组合数据
      // 发送相关信息
    }
     // 重写onHide
    args[0].onHide = function () {
      console.log('拦截的onHide....')
      currRoute = smaUtils.getPagePath()
      let stayTime = smaUtils.getTime() - beginTime
        // 组合数据，发送
      oOnHide && oOnHide.call(this, arguments)
    }

    // onShare
    if (SMA_CONFIG.stat_share_app && args[0].onShareAppMessage) {
      const oOnShareAppMessage = args[0].onShareAppMessage
      args[0].onShareAppMessage = function () {
        console.log('用户分享...')
        currRoute = smaUtils.getPagePath()
        // 发送分享信息
        oOnShareAppMessage.call(this, arguments)
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
    if (SMA_CONFIG.error_report) {
      let oOnError = args[0].onError
      args[0].onError = function () {
        // console.log('拦截的onError', arguments)
        oOnError && oOnError.apply(this, [].slice.call(arguments))
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
    SMA_CONFIG = Object.assign({}, SMA_CONFIG, config)
    smaUtils.setBasicInfo()
    // 拦截Page, App 全局方法
    rePlacePage()
    SMA.Data.reportTimer = setInterval(() => {
      console.log('this.SMA.Data.logArr:', this.Data.logArr)
      if (SMA.Data.logArr.length) {
        smaUtils.request(SMA_CONFIG.api_base)
      }
    }, 1000 * 5)
  },
  // 事件跟踪
  track: function(type, data) {
    console.log('数据跟踪.....', this)
    SMA.Data.logArr.push({ type, ...data })
  },
  // 错误上报
  report: function(type, data) {},
  Data: {
    reportTimer: -1,
    userInfo: null,
    baseInfo: null,
    lanuchInfo: null,
    logArr: [] // 日志数据
  }
}

export default SMA
