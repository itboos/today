/* 一个简单的带路由的服务器 */
const http = require('http');
console.log('process.env.POR：', process.env.POR);
console.log('process.env：', process.env);
console.log('process', process);
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