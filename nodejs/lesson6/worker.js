#!/usr/bin/env node
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello world\n');
}).listen(Math.round(300), '127.0.0.1');