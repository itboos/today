/**
 * desc 函数相关概念
 */

// https://juejin.im/post/5dcdfcda5188254ede741444

// 函数防抖： 频繁触发的函数，只会执行最后一次
// 应用场景：表单验证、模糊查询等
function debounce(fn, timeout) {
  let timer = 0
  return function() {
    let self = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      return fn.apply(self, arguments)
    }, timeout)
  }
}

function logName(name) {
  console.log('hi, I am', name)
}

var fnDebounce = debounce(logName, 3000)
// fnDebounce()
// fnDebounce()

// var res = fnDebounce('小明')
// console.log('res:', res)

// 函数节流: 频繁触发的函数，在一段时间内只执行一次(就是执行最开始的那次调用)
// 应用场景：如鼠标移动事件等,下单按钮等操作

// throttle
function thtottle(fn, timeout) {
  let timer = null
  return function() {
    const context = this
    if(!timer) {
      timer = setTimeout(() => {
        fn && fn.apply(context, arguments)
        timer = null
      }, timeout)
    }
  }
}
var fnThtottle = thtottle(logName, 300)
fnThtottle('第1次调用')
fnThtottle('第2次调用')
fnThtottle('第3次调用')
setTimeout(() => {
  fnThtottle('第4次调用')
}, 4000)


// 函数柯里化：将接收多个参数的函数变为只接受一个单一的参数的函数，并返回接收余下参数的函数和返回结果的新函数
// 应用场景：延迟计算，参数复用，动态生成函数

function curry(fn) {
  let args = []
  // 返回命名函数，方便递归调用
  return function next() {
    args = [...args, ...arguments]
    // 参数大于 0， 返回 next
    if (arguments.length > 0) {
      return next
    }
    // 参数格式等于0，返回计算结果的函数
    const context = this;
    return fn.apply(context, args)
  }
}

// 原函数, 功能：返回参数相加的结果
function increment() {
  let args = arguments;
  let result = 0;
  for (let i = 0; i < args.length; i++) {
      result += args[i];
  }
  return result;
}

// 柯里化之后
let add = curry(increment);
var res = add(10, 10, 10)(20)(30)(); // 80
console.log('res:', res)