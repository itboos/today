/*  codes   */
// 1. nodejs拷贝文件
// 执行方法:  node main '/Users/xueqi/Desktop/a.js' '/Users/xueqi/Desktop/b.js'
// 
//   node main '/Users/xueqi/Desktop/a.js' '/Users/xueqi/Desktop/b.js' 将a.js拷贝到b.js
var fs = require('fs');

function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function main(argv) {
    copy(argv[0], argv[1]);
}
console.log(process);
console.log(process.argv);
main(process.argv.slice(2));

//2. 以数据流的方式读写数据
var fs = require('fs');

function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));

//   3.深度优先遍历一个目录以及它的子目录

var path= require('path');
var fs=require('fs');

function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}
travel('/Users/xueqi/Desktop/git/today/nodejs/lesson5', function (pathname) {
    console.log(pathname);
});



/*递归删除目录*/
// rmDirAll  
// ===================================
var fs = require('fs');

// 删除path下所有的文件和文件夹，包括path自己
function rmDirAll(path){
  // 获取字符串
  var getLastCode = function(str){
      return str.substr(str.length-1, 1);
  }

  var stats = fs.statSync(path); // 获取当前文件的状态
  if( stats.isFile() ){
      fs.unlinkSync(path);
      console.log( '删除成功： '+path );
  }else if( stats.isDirectory() ){
      // 若当前路径是文件夹，则获取路径下所有的信息，并循环
      var files = fs.readdirSync(path);

      for(var i=0, len=files.length; i<len; i++){
          var item = files[i],
              itempath = getLastCode(path)=='/'  ? path+item : path+'/'+item; // 拼接路径
          var st = fs.statSync(itempath);
          if( st.isFile() ){
              fs.unlinkSync(itempath);
              console.log( '删除成功： '+itempath );
          }else if( st.isDirectory() ){
              // 当前是文件夹，则递归检索
              rmDirAll( itempath );
          }
      }
      // 现在可以删除文件夹
      fs.rmdir(path);
      console.log( '删除成功： '+path );
  }
}
// ===================================
var disDir = "./dist";

// 如果存在dist, 则删除
if (fs.existsSync(disDir)){
  rmDirAll('./dist'); 
}
// 如果不存在dist, 则创建
if (!fs.existsSync(disDir)){
  fs.mkdir('./dist');
}

// 复制fis文件到dist
function copyFile(src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src));
}
copyFile('./fis-conf.js', disDir +'/fis-conf.js');

// ====================