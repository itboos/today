/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

 /** 
  * 组合方法
  * compose(funcA, funcB, funcC) 形象为 compose( funcA( funcB( funcC() )) )
  * 从右到左把接收到的函数合成后的最终函数。
  * (arguments): 需要合成的多个函数。预计每个函数都接收一个参数。
  * 它的返回值将作为一个参数提供给它左边的函数，以此类推。
  * 例外是最右边的参数可以接受多个参数，因为它将为由此产生的函数提供签名。
  * 数组的reduce 签名参考: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  * arr.reduce(callback[, initialValue])
  * callback(prev, current)
 */
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// 栗子：
/*
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(function(prev, current){
    return function(...args) {
      return prev(current(...args))
    }
  })
}

function A (a) {
  // a 的值为B 函数的返回值
  console.log('我是方法A...', a)
}

function B (b) {
  // b 的值为C函数的返回值
  console.log('我是方法B...',b)
  return 'B函数的返回值'
}
 
function C (...args) {
  console.log('我是方法C...', a, b, c)
  return 'C函数的返回值';
}

// finalFun 函数的功能相当于 A(B(C()))
// 最右边的方法可以接收多个参数, 它的参数为finalFunc 函数的签名, C 函数的返回值 作为它左边的那个方法的参数，
//  以此类推（如果没有显示的返回值的话，则相当于返回了undefined ）

var finalFunc =  compose2(A, B, C); 
finalFunc('a','b', 'c');

*/