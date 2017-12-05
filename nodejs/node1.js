var http = require('http');
var http = http.createServer((req, resp) => {
  resp.writeHead(200, {
    'Content-type': 'text/json'
  });
  resp.end('hi, node.js...., hihihihihi');
});
http.listen(8888);
console.log('Server running at http://127.0.0.1:8888');
console.log(http);