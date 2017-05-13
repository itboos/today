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
