// 引入依赖
var express = require('express');

// 建立 express 实例
var app = express();
// 引入数据，前端就可以调用接口获取数据了
var list = require('./data/aiticle_list.json');

app.get('/list', function (req, res) {
  // 从 req.query 中取出我们的 q 参数。
  // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
  var q = req.query.q;
  res.send(JSON.stringify(list));
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});