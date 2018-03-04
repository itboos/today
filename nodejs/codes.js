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
// =========一个模块/包 兼容Node, AMD, CMD 以及浏览器环境， 为了保持一致性， 类库开发者需要将类库包装在一个比包内 ========
  ;(function(name, definition){
    // 检测上下文是否为AMD 或者CMD
    var hasDefine = typeof define === 'function',
        hasExports = typeof module !== 'undefined' && module.exports;
    if(hasDefine) {
      // AMD 环境或 CMD环境
      define(definition);
      console.log('hasDefine');
    } else if (hasExports) {
    // 定义为node模块
      module.exports = definition();
      console.log('hasExports...');
    } else {
      // 将模块的执行结果挂在window变量中， this 在浏览器环境里指向window
      this[name]  = definition();
      console.log('浏览器中....');
    }
  })('hello', function() {
      var hello = function(){};
      return hello;
  })

// =================
// 查看node中内存占用的情况:
process.memoryUsage();
// 格式化node中内存的方法
var showMem = function() {
    var mem = process.memoryUsage();
    var format = function(bytes) {
      return (bytes / 1024 / 1024).toFixed(2) + 'MB';
    }
    console.log('Process: heapTotal: ' + format(mem.heapTotal) + ' heapUsed: ' + format(mem.heapUsed) + '  rss:  ' + format(mem.rss));
    console.log('------------------------------------------');
  };
  var useMem = function() {
    var size = 20 * 1024 * 1024;
    var arr = new Array(size);
    for (var i  = 0; i < size; i++) {
      arr[i] = 0;
    }
    return arr;
  };
  var total = [];
  for (var j = 0; j < 15; j++) {
    showMem();
    total.push(useMem());
  }
  
  showMem();

  /*
  小结： Node的内存构成主要由V8进行分配的部分和Node自行进行分配的部分。
  受V8的垃圾回收限制的主要是V8的堆内存. 堆外内存可以不受显示比如Buffer对象
  */
// =================
// =================
