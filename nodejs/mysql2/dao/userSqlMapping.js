// CRUD SQL语句
var user = {
	insert:'INSERT INTO test_user(id, name, age) VALUES(0,?,?)',
	update:'update test_user set name=?, age=? where id=?',
	delete: 'delete from test_user where id=?',
	queryById: 'select * from test_user where id=?',
	queryAll: 'select * from test_user'
};
 
module.exports = user;