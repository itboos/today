// 主进程
var cp = require('child_process').fork;
var cpus = require('os').cpus();

var server = require('net').createServer();
server.listen(1337);

var workers = {};
var createServer = function() {
  var worker = fork(__dirname + './worker.js');
  // 退出时重新启动新的进程
  worker.on('exit', function() {
    console.log('Worker' + worker.pid + 'exited.');
    delete workers[worker.pid]
    createServer();
  })
  // 句柄转发
  worker.send('server', server);
  workers[worker.pid] = worker;
  console.log('Create worker .pid:' + worker.pid);
}

for (var i = 0; i < cups.length; i++) {
  createServer();
}

// 进程自己退出时，让所有的工作进程退出
process.on('exit', function(){
  for(var pid in workers) {
    workers[pid].kill();
  }
});

console.log('listen at 1337...');
// curl http://127.0.0.1:1337