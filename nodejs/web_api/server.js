var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '123456',
		database : 'test_db',
	});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

	
app.get('/',function(req,res){
	var data = {
		"Data":""
	};
	data["Data"] = "Welcome to Book Store DEMO...";
	res.json(data);
});

// 查询book
app.get('/book',function(req,res){
	var data = {
		"error":1,
		"Books":""
	};
	console.log('查询....');
	connection.query("SELECT * from book",function(err, rows, fields){
		if(rows.length != 0){
			data["error"] = 0;
			data["Books"] = rows;
			res.json(data);
		}else{
			data["Books"] = 'No books Found..';
			res.json(data);
		}
	});
});

// 添加图书
app.post('/book',function(req,res){
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var id = parseInt(req.body.id);
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Bookname && !!Authorname && !!Price){
		connection.query("INSERT INTO book VALUES(?,?,?,?)",[id,Bookname,Authorname,Price],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Error Adding data, error is" + err;
			}else{
				data["error"] = 0;
				data["Books"] = "Book Added Successfully";
			}
			res.json(data);
		});
	}else{
		data["Books"] = "Please provide all required data (i.e : Bookname, Authorname, Price)";
		res.json(data);
	}
});

// 更新book
app.put('/book',function(req,res){
	var Id = req.body.id;
	var Bookname = req.body.bookname;
	var Authorname = req.body.authorname;
	var Price = req.body.price;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Id && !!Bookname && !!Authorname && !!Price){
		connection.query("UPDATE book SET BookName=?, AuthorName=?, Price=? WHERE id=?",[Bookname,Authorname,Price,Id],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Error Updating data";
			}else{
				data["error"] = 0;
				data["Books"] = "Updated Book Successfully";
			}
			res.json(data);
		});
	}else{
		data["Books"] = "Please provide all required data (i.e : id, Bookname, Authorname, Price)";
		res.json(data);
	}
});

// 删除book
app.delete('/book',function(req,res){
	var Id = req.body.id;
	var data = {
		"error":1,
		"Books":""
	};
	if(!!Id){
		connection.query("DELETE FROM book WHERE id=?",[Id],function(err, rows, fields){
			if(!!err){
				data["Books"] = "Error deleting data";
			}else{
				data["error"] = 0;
				data["Books"] = "Delete Book Successfully";
			}
			res.json(data);
		});
	}else{
		data["Books"] = "Please provide all required data (i.e : id )";
		res.json(data);
	}
});

http.listen(8080,function(){
	console.log("Connected & Listen to port 8080");
});