const express = require('express');
const cros = require('cors');
const port = process.env.PORT || 3000;

var app = express();
app.use(cros());
app.use(express.static('public2'));
app.use(express.static('public'));

app.get('/', function(req, res) {
  const info = {
    name: 'StackOverflow',
    num: 10086,
    books: {
      a: 1,
      b: 2,
      c: 3
    }
  };
  // res.json(info);
  // 或者
  res.send(JSON.stringify(info));
});

app.listen(port, function() {
  console.log('Node.js listening on port:' + port);
});
