var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'mysql'
});

connection.connect();

connection.query('SELECT * from test_user', function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log('The result is: ',  results);
});
console.log('执行到here...');
connection.end();