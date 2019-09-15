// 返回 从右 往左的函数组合。
 /** 
  * 组合方法
  * compose(funcA, funcB, funcC) 形象为 (...args) => funcA( funcB( funcC(...args) ))
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
  return funcs.reduce((a, b) => (...args) => { return a(b(...args)) })
}