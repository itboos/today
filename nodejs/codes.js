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

// ======== 博客: 笔记: 深入浅出Node.js...   关于为何存在exports 的情况下， 还存在module.exports =========
    // 在编译的过程中，node对获取的js 文件进行了包装, 
    (function(exports, require, module, __filename, __dirname) {
      // 其它代码
    })
    // 为什么 对外导出模块需要使用module.exports 而不是 直接使用 exports呢?
    // 这是因为: exports 对象是通过形式参数(exports是一个对象,  形参是保存了exports对象的引用, 即形参是一个指针， 它的值是一个地址-联想C语言 )的方式传入的， 直接赋值只会改变形式参数的引用， 不能改变作用域外的值

// 看下面的demo:

var zdlMdule = {
    exports: {
      name: 'zdl_s'
    }
  }
  
  console.log("-----------");
  
  (function(zdlMdule, zexports) {
  
    console.log(zdlMdule);
    console.log(zexports);
    // zexports = {name: 'nming'}; 这样写外面的exports的值不会变， 
    zdlMdule.exports = {name: 'nming'}; // 这样写才会变
    console.log('zexports', zexports);
  
  })(zdlMdule, zdlMdule.exports)
  
  console.log('外面:', zdlMdule.exports);
// =================
