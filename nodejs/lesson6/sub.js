
// 子进程 sub.js
var http = require('http');
var server = http.createServer((req, res) => {
  res.writeHead(200, {'Conent-type': 'text/plain'});
  res.end('子进程处理....,pid is' + process.pid+ '\n');
});
process.on('message', function(m, tcp) {
  if (m === 'server') {
    console.log('here....');
    tcp.on('connection', function(socket) {
      server.emit('connection', socket);
    });
  }
});