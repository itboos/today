//index.js
//获取应用实例
var app = getApp()


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    a:1,
    b:2,
    c:3,
    d:4,
    str:'这是一个字符串',
    arr:['1','2','3','4'],
    zero:0,
    obj:{
      name:"ZDL",
      // title:"徐文华与母狗.avi",
      age:23,
      job:"WEN前端"
    },
    item: {
      index: 998,
      msg: 'this is a template',
      time: '2016-09-15'
    },
    score:190,
     objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
      {id: 6},
    ],
    numberArray: [1, 2, 3, 4],
    textColor:"yellow",
     
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      //url: '../logs/logs'
      url: '../templates/C'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    if (wx.openBluetoothAdapter) {
        wx.openBluetoothAdapter();
        console.log(wx);
        console.log(wx.openBluetoothAdapter);
        wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      });
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
}
  },

})
