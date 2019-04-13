/**
 * @author zhongdonlin@spuermonkey.com.cn
 * @param {String} url 
 * @param {Function} callback 
 */
function loadScript (url, callback) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  if (script.readyState) { // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else { // Others
    script.onload = function () {
      callback()
    }
  }

  script.src = url
  document.body.appendChild(script)
}
/* global wx */
// https://mp.weixin.qq.com/wiki?action=doc&id=mp1421141115&t=0.26562163609111944#63
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
// http://js.supermonkey.com.cn/libjweixin-1.4.0.js
/**
 * 
 * @param {Object} jsapi 微信签名
 * @param {Object} wxShareConfig  微信分享配置
 * @param {Boolean} isDebug optional 是否开启调试
 */
function wxInit (jsapi, wxShareConfig, isDebug = false) {
  wx.config({
    debug: isDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: jsapi.appId, // 必填，公众号的唯一标识
    timestamp: jsapi.timestamp, // 必填，生成签名的时间戳
    nonceStr: jsapi.nonceStr, // 必填，生成签名的随机串
    signature: jsapi.signature,// 必填，签名
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
  })
  wx.ready(function() {
    console.log('wx config success')
    // 分享给朋友”及“分享到QQ”
    wx.updateAppMessageShareData({
      title: wxShareConfig.title, // 分享标题
      desc: wxShareConfig.desc, // 分享描述
      link: wxShareConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: wxShareConfig.imgUrl, // 分享图标
      success: function () {
        // 设置成功
      },
      fail: function (res) {
        console.log('updateAppMessageShareData', res)
      }
    });
    // PS 直接使用1.4.0 的SDK, 安卓分享不生效
    // 之前版本，兼容安卓
    wx.onMenuShareAppMessage && wx.onMenuShareAppMessage({
      title: wxShareConfig.title, // 分享标题
      desc: wxShareConfig.desc, // 分享描述
      link: wxShareConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: wxShareConfig.imgUrl, // 分享图标
      success: function () {
        // 设置成功
      },
      fail: function (res) {
        console.log('onMenuShareAppMessage', res)
      }
    });
    // “分享到朋友圈”及“分享到QQ空间”
    wx.updateTimelineShareData({
      title: wxShareConfig.title, // 分享标题
      link: wxShareConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: wxShareConfig.imgUrl, // 分享图标
      success: function () {
        // 设置成功
      },
      fail: function (res) {
        console.log('updateTimelineShareData', res)
      }
    });
    // 之前版本，兼容安卓
    wx.onMenuShareTimeline && wx.onMenuShareTimeline({
      title: wxShareConfig.title, // 分享标题
      link: wxShareConfig.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: wxShareConfig.imgUrl, // 分享图标
      success: function () {
        // 设置成功
      },
      fail: function (res) {
        console.log('onMenuShareTimelin', res)
      }
    })
  })
  wx.error(function (res) {
    console.log('微信签名出错')
  });
}
export {
  wxInit,
  loadScript
}