/* 创建一个简单的服务器 */
// 创建一个简单的http服务器. 里面的回调函数是等有客户端请求对应的端口时， 才调用这个方法的
// ===================================

const http = require('http');
http.createServer((resquest, response) => {
  console.log('here...');
  // 1.告诉浏览器返回正常， 并且设置返回的数据格式为text/plain
  response.writeHead(200, {
    'Cotent-Type': 'text/plain'
  });
  // 2.写入页面响应的内容
  response.write('Hello Nodejs.....');
  // 3. 告诉服务器，所有的响应头和响应体已经被发送了
  console.log('server has set up and post is:', 8080);
  response.end();
}).listen(8080);
// 监听服务器的端口

// ===================================

/* 一个简单的带路由的服务器 */
const http = require('http');

/* 不同的路由对应不同的处理方法 */
var routers =  {
  '/': function(request, response) {
    response.writeHead(200);
    response.end('hello nodejs.....');
  },
  '/hello': function(request, response){
    response.writeHead(200);
    response.end('now you are at viewing "foo" .....');
  },
};
http.createServer((request, response) => {
  console.log('request:', request);
  if (request.url in routers) {
    return routers[request.url](request, response);
  }
  response.writeHead(404);
  response.end(http.STATUS_CODES[404]);
}).listen(8080);

// ===================================
// 一个基本的express 框架服务器
const express = require('express');
const app = express();
const port = 3000;
app.get('/', function(request, response) {
  response.send('hello node.js');
});
app.listen(port, function() {
  console.log('服务器监听的是:', port);
});
// ===================================
//  一个现代的express路由程序 Example with services that shows middleware factory advantages.
// greet.js

const express = require('express');

module.exports = function(options = {}) {
  const router = express.Router();
  // get Controller
  const {service} = options;
  router.get('/greet', (req, res, next) => {
    console.log('req.query:', req.query);
    res.end(
      service.createGreeting(req.query.name || 'Stranger')
    );
  });
 
  return router;
}

// app.js

const express = require('express');
const port = 3000;
const greetMiddleware = require('./greet.js');

class GreetingService {
  constructor(greeting = 'hello') {
    this.greeting = greeting;
  }
  createGreeting(name) {
    return  `${this.greeting}, ${name}`;
  }
}

express()
        .use('/api/v1/service1', greetMiddleware({
          service: new GreetingService('Hello...'),
        }))
        .use('/api/v1/service2', greetMiddleware({
          service: new GreetingService('HI...')
        }))
        .listen(port);

/*
   When accessing http://<hostname>:8080/api/v1/service1/greet?name=World the output will be Hello, World and accessing http://<hostname>:8080/api/v1/service2/greet?name=World the output will be Hi, World.
*/
// ===================================
// express 发送json api demo:
const express = require('express');
// Use cors module for enable Cross-origin resource sharing, 需要单独安装依赖
const cros = require('cors');
const port = process.env.PORT || 3000;

var app = express();
app.use(cros());

app.get('/', function(req, res) {
  const info = {
    name: 'StackOverflow',
    num: 10086,
  };
  // res.json(info);
  // 或者
  res.send(JSON.stringify(info));
});

app.listen(port, function() {
  console.log('Node.js listening on port:' + port);
});

// ===================================
// 配置静态文件目录: 可以配置多个静态文件夹, 当请求时，有多个同名文件时，先匹配到那个文件就使用哪一个.（按定义静态文件夹的顺序来的）
 app.use(express.static('public'));
 // 这样, public 里的所有文件就可以当做静态文件来访问了,并且不需要加public目录

// ===================================
// ===================================
// ===================================
// ===================================
