var helloData = {
  name: 'WeChat',
  list: [{
    name: '手机用户2803',
    uid: 10895642,
    index: 1,
    head:             'http://static.live.nagezan.net/6aee5d74-03a3-4068-bfd3-fbebd9c7c668.jpg'
  }],
};

// 添加假数据
for(var i = 0; i < 20; i++) {
  var newObj = copyObj({}, helloData.list[0]);
  helloData.list.push(newObj);
  helloData.list[i+1].index = i+2;
}

function copyObj(newObj, oldObj) {
  var newObj = {};
  Object.assign(newObj, oldObj);
  return newObj;
}
console.log(helloData.list);

// 注册页面函数

Page({
  data: helloData,
  changeName: function() {
    // 设置数据
    this.setData({
      name: 'Zack Zhong'
    });
  },
});