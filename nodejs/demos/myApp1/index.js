
const http = require('http');
const url =  require('url');
const querystring =  require('querystring');

http.createServer((resquest, response) => {
 
  const cookie = resquest.headers.cookie;
  console.log('cookie:', cookie);
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