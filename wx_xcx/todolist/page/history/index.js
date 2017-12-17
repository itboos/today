var todos = {
  list: []
};

// 注册页面函数
Page({
  data: todos,
  changeName: function () {
    // 设置数据
    this.setData({
      name: 'Zack Zhong'
    });
  },
});

const host = 'https://easy-mock.com/';
wx.request({
  url: `${host}mock/5a338ae8c3241c0f4c9c59d1/example/user`,
  data: {},
  success: function (res) {
    console.log('获取结果', res)
    todos.list = res.data.todos;
  },
  fail: function (res) {
    console.log('请求失败:', res)
    callback(res)
  }
})