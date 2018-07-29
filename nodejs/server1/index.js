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

app.get('/q', function (req, res) {
  // 从 req.query 中取出我们的 q 参数。
  // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
  var q = req.query;
  console.log('请求参数为:', q);
  if (q.callback) {
    const listStr = JSON.stringify({ msg: 'success', status: 200 });
    res.send(`${q.callback}(${listStr})`);
  } else {
    // 普通的数据
    res.send(JSON.stringify(list));
    // 注意:
    /*
      如果是通过srcipt 标签 的jsonp 的形式访问的话， Chrome 会拦截， 但是返回 callback('data') 这样直接调用方法的话，确实可以执行的.
      demo2.html:53 Cross-Origin Read Blocking (CORB) blocked cross-origin 
      response http://localhost:3000/q/?msg=helloJsonp&callback2=jsonpCb with MIME type text/html. 
      See https://www.chromestatus.com/feature/5629709824032768 for more details.
    */
  }
});

app.post('/api/post',function(req, res) {
  var q = req.query;
  console.log('post请求参数为:', q);
  res.send(JSON.stringify(list));
})

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});