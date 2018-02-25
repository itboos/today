const express = require('express');
const app = express();
const port = 3000;
app.get('/', function(request, response) {
  response.send('hello node.js');
});
app.listen(port, function() {
  console.log('服务器监听的是:', port);
});