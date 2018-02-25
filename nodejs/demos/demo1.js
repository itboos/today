// 创建一个简单的http服务器. 里面的回调函数是等有客户端请求对应的端口时， 才调用这个方法的
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