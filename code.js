// 1.给出两个整数a和b, 求他们的和, 但不能使用 + 等数学运算符。 
/* 1.1 return a-(-b)
   1.2 通过位运算:
   https://my.oschina.net/u/2462998/blog/663534
   function addTwo(a, b) {
     var sum = 0;
     var carry = 0;
     do {
       sum = a ^ b;
       carry = (a & b) << 1;
       a = sum;
       b = carry;
     } while(carry !== 0);
     return sum;
   }
*/ 

// 2. 不通过第三方变量，交换两个数字变量
/*
   2.1 通过异或操作
   function swipeTwo(a, b) {
     a = a ^ b;
     b = b ^ a;
     a = a ^ b;
   }
*/

// 3. 设计一个算法，计算出n阶乘中尾部零的个数
// https://blog.csdn.net/kkdd2013/article/details/51880672
/*
   functonTrailingZeros(n) {
      var  sum = 0;
      while (n != 0) {
          sum += n / 5;
          n /= 5;
      }
      return sum;
   }
   本题是求n! 的十进制形式的末尾 0 的个数（n /= 5），类似还有求2进制形式的末尾0的个数，3进制形式末尾0的个数。二进制就是 n /=2 ，三进制就是 n /= 3。
*/


// 冒泡排序: 将第一个数和后面的一个数相比， 若更大/(更小)，则交换，每一趟下来， 得到一个最大数， 每一轮比较的次数减一 
// 优化， 
var arrs = [10, 1, 3, 2, 6], temp = 0;
for (var i = 0, len = arrs.length; i < len; i++) {
    for (j = 0; j < len-i; j++) {
        if (arrs[j] > arrs[j+1]) {
            temp = arrs[j];
            arrs[j] = arrs[j+1];
            arrs[j+1] = temp;
        }
    }
}
console.log(arrs);
//黑科技:
简单的实现一个兼容性较好的深拷贝对象的方案:
var soucreObj = {
    a: '测试文字',
    f: ['zdl', 'xueqi', 'cwy'],
};
var newObj = JSON.parse(JSON.stringify(soucreObj));
console.log(newObj.f === soucreObj.f); // false  因为是深拷贝， 所有新对象拥有一份完全新的数据
// 这里的原理就是利用了JSON.parse 会生成一个全新的对象

/* eslint-disable */

// 设计一个迭代器，用来在一个队列上运行，一次一个条目

var tasks = {
   [Symbol.iterator]() {
     var steps = this.actions.slice();
     return {
       // 使迭代器本身成为iterable
       [Symbol.iterator]() { return this },
 
       next(...args) {
         if (steps.length > 0) {
           let res = steps.shift()(...args)
           return { value: res, done: false }
         } else {
           return { value: undefined, done: true }
         }
       },
 
       return(v) {
         steps.length = 0;
         return { value: v, done: true };
       }
     }
   },
   actions: []
 };
 
 // 使用task 队列的一种方式
 tasks.actions.push(
   function step1(x) {
     console.log('step 1:', x)
     return x * 2;
   },
   function step2(x, y) {
     console.log('step 2:', x, y)
     return  x + (y * 2);
   },
   function step3(x, y, z) {
     console.log('step 3:', x, y, z)
     return (x * y) + z;
   }
 );
 
 var it = tasks[Symbol.iterator]();
 var res1 = it.next(10); // x: 20, done: false
 var res2 = it.next(20, 50); // 20 + (50*2) 120
 var res3 = it.next(20, 50, 120);// 1120
 var res4 = it.next();
 
 console.log(res1, res2, res3, res4)
 
 // 一个缓存简单的缓存函数调用结果的方法, 可以用于reselect 中的缓存方法
 
 function Momorize(fn) {
   const cacheMap = {};
   return function(...args) {
     const key = Array.prototype.join.call(args, '_')
     let result
     if (!cacheMap[key]) {
       result = fn.apply(null, args)
       cacheMap[key] = result
     } else {
       console.log('使用缓存结果：参数为', key)
     }
     console.log('cacheMap:', cacheMap)
     return cacheMap[key];
   }
 }
 
 function add (x, y) {
   console.log('调用add:', x, y)
   return x + y
 }
 
 // var res1 = add(999, 1);
 // var res2 = add(999, 1);
 var addWithCache = Momorize(add);
 var res1 = addWithCache(999, 1)
 var res2 = addWithCache(999, 1)
 var res3 = addWithCache(999, 1)
 var res4 = addWithCache(1000, 1)
 var res5 = addWithCache(999, 1)
 console.log('res1:', res1, res2, res3, res4, res5)
 
 

 // 兼容性较好 的 base 64 编码解码方法(可以解决解码时中文乱码的问题)

// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_.22Unicode_Problem.22
// https://segmentfault.com/a/1190000016290403
// base 64 编码工具
function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
  }));
}

b64EncodeUnicode('✓ à la mode'); // "4pyTIMOgIGxhIG1vZGU="
b64EncodeUnicode('\n'); // "Cg=="


// base 64 解码工具
function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

b64DecodeUnicode('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"
b64DecodeUnicode('Cg=='); // "\n"


// seamless-immutable.js 模块化写法:
(
  function() {
    "use strict";
    function immutableInit(config)  {
      // ...
    }
    var Immutable = immutableInit();
    /* istanbul ignore if */
    if (typeof define === 'function' && define.amd) {
      define(function() {
        return Immutable;
      });
    } else if (typeof module === "object") {
      module.exports = Immutable;
    } else if (typeof exports === "object") {
      exports.Immutable = Immutable;
    } else if (typeof window === "object") {
      window.Immutable = Immutable;
    } else if (typeof global === "object") {
      global.Immutable = Immutable;
    }
  }
)()

/**
 *  支持 promise 异步操作的责任链, 任务可以顺序传递下去，按顺序执行，也可以在某处中断。
 *  promise 的顺序调用 2020.02.22
 * @param {*} next 
 * @param {*} params 
 */
function init1(next, params) {
  console.log('init1:', params)
  next(params)
}
function doSomeThing() {
  return new Promise((resolve) => {
    console.log('new Promis...')
    setTimeout(function() {
      console.log('setTimeout...')
      resolve(998)
    }, 3000)
  })
}
async function init2(next, params) {
  const res = await doSomeThing()
  console.log('init2:', res)
  next(params)
  // 终止责任链
  // return 'end'
  // 也可以 把这个 获得的结果 继续传递下去：
  // next(res)
}

function init3(next, params) {
  console.log('init3:', params)
  next(params)
}

// 这里可以是一些 异步或者 同步的 任务， 会按 顺序依次执行下去。
const list = [init1, init2, init3]
// const list = [init1, init3]

function chain(list, params) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await (list.shift())(next, params)
      console.log('result:', result)
      // 如果有 结果返回， 或者 设置 一个标识字段，有了这个返回，就任务想提前终止责任链。
      if (result !== undefined) {
        resolve(result)
      }
    } catch (e) {
      reject(e)
    }

    function next(params) {
      if (list.length === 0) {
        console.log('即将 resolve...')
        resolve(params)
      } else {
        resolve(chain(list, params))
      }
    }
  })
}

function callFn(list, params) {
  return chain(list, params)
}

const res = callFn(list, { a: 1, b: 2 })
console.log('res:', res)


// JSON.stringify Polyfill --start
//: number, string, boolean, null, undefined, array, regexp, date
/* eslint-disable */
function type(v) {
  const reg = /\[\w+\s(\w+)\]/gi
  const str = Object.prototype.toString.call(v)
  return reg.exec(str)[1].toLocaleLowerCase() 
}

/**
 * desc JSON.stringify Polyfill
 * 可以 处理 string, regRex, object, null, boolean 等类型的值
 * 对于属性值为 undefined， function, Symbol 的属性会跳过处理
 * 对于属性值为  NaN 的属性，会把值改成 null, typeof NaN = 'number'
 * 对于属性值为 RegExp 的属性，值变成一个 {} 对象
 * 对于 Date 对象， 会调用 date 对象的 toISOString 方法
 * @param {*} source 
 */
function stringifyPolyfill(source) {
  let str = undefined
  switch(type(source)) {
    case 'number':
       // 处理 NaN
      // eslint-disable-next-line
      str = source !== source  ?  'null' : '"'+ source + '"'
      break
    case 'string':
    case 'boolean':
      str = '"'+ source + '"'
      break
    case 'null':
        str =  'null'
        break
    case 'date':
      // new Date().toJSON() = new Date().toISOString()
      str = '"' +  new Date().toISOString() + '"'
      break
    case 'regexp':
        str = '{}'
        break
    case 'array':
      str = stringifyArray(source)
      break
    case 'object':
      str = stringifyObj(source)
      break
    default:
  }
  return str
}

function stringifyObj(obj) {
  const keys = Object.keys(obj)
  let res = '{'

  keys.forEach( key => {
    const v = obj[key]

    switch(type(v)) {
      case 'number':
      case 'boolean':
      case 'null':
        // NaN !== NaN
        res = v !== v ? res + '"'+ key + '"' + ":" + null + "," :
        res + '"'+ key + '"' + ":" + v + ","
        break
      case 'string':
        res = res + '"'+ key + '"' + ":" + '"' + v + '"' + ","
        break
      case 'date':
        // new Date().toJSON() = new Date().toISOString()
        res = res + '"'+ key + '"' + ":" + '"' +  new Date().toISOString() + '"' + ","
        break
      case 'regexp':
        res = res + '"'+ key + '"' + ":" + '{}' + ","
        break
      case 'array':
        res = res + '"'+ key + '"' + ":" +  stringifyArray(v) + ','
        break
      case 'object':
        res = res + '"'+ key + '"' + ":" + stringifyObj(v) + ','
        break
      default:
    }
  })

  res = res.slice(0, res.length - 1)
  res += '}'
  return res
}

function stringifyArray(arr) {
  let res = "["

  arr.forEach(v => {
    switch(type(v)) {
      case 'number':
      case 'boolean':
      case 'null':
        // NaN !== NaN
        res = v !== v ? res + null + "," :
        res + v + ","
        break
      case 'string':
        res = res + '"'+ v + '"' + ','
        break
      case 'date':
        // new Date().toJSON() = new Date().toISOString()
        res = res + new Date().toISOString() + ","
        break
      case 'regexp':
        res = res + '{}' + ","
        break
      case 'array':
        res = res + stringifyArray(v) + ','
        break
      // 是对象，循环调用自身， 在哪个位置判断循环引用
      case 'object':
        res = res + stringifyObj(v) + ','
        break
      default:
    }
  })

  res = res.slice(0, res.length - 1)
  res += ']'
  return res
}

var a = {
  o1: '1',
  name: 'zack',
  gf: {
    name: '小青',
    bf: {
      name: '小明',
      age: 25,
    }
  },
  arr: [2,4,5,6,7, [8, 9, 10], {a: 1, b: 2 } ],
  fn: stringifyPolyfill,
  sys: Symbol('sss'),
  test: NaN,
  reg: new RegExp('abc'),
  c: null,
  date: new Date(),
  bool: true
}

// console.log('JSON.stringify:', JSON.stringify(a))
// console.log(stringifyPolyfill(a) === JSON.stringify(a))
// console.log(stringifyPolyfill(a))

console.log(stringifyPolyfill(null))
console.log(stringifyPolyfill(null) === JSON.stringify(null)) // true

// console.log(stringifyPolyfill(undefined))
// console.log(stringifyPolyfill(undefined) === JSON.stringify(undefined)) // true


// console.log(stringifyPolyfill(1))
// console.log(stringifyPolyfill(new Date()))
// console.log(stringifyPolyfill(new Date()) === JSON.stringify(new Date())) // true

// console.log(stringifyPolyfill(true))
// console.log(stringifyPolyfill(/abc/))

// JSON.stringify Polyfill --end