// pages/welcome/welcome.js
Page({
  data:{
    text:"第一次使用小程序，好紧张啊!",
    imgSrc:"../static/1.jpg"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //处理事件
  begin:function(){
    console.log('点击了开始按钮....');
    wx.navigateTo({
      url: '../index/index',
      success: function(res){
        // success
        console.log("跳转成功....");
        console.log(res);
      },
      fail: function(res) {
        // fail
        console.log('跳转失败....');
        console.log(res);
      },
      complete: function(res) {
        // complete
        console.log('完成跳转...');
        console.log(res);
      }
    })

  }
})