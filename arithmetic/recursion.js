/**
 * 递归(Recursion)： 找出递推式，确定终止条件，将递推式转换成代码
 * 调试递归的方式：单步调试不可行, 可以通过打印日志，观察递归值。结合条件断点进行调试。
 * 或者设置一个 条件，到了就打印结果或者返回。
 */

/* demo:
* 递推式： 
* 1 n=1
* 2 n=2
* fn(n-1) + f(n-2) n>2
*/

// 常规版：
function findRes(n) {
  if (n === 1) {
    return 1
  }
  if (n === 2) {
    return 2
  }
  return findRes(n-1) + findRes(n-2)
}

// 优化版，保存了已经求解过的子问题的结果，避免重复计算子问题。

var resMap = {}
function findRes2(n) {
  if (n === 1) {
    return 1
  }
  if (n === 2) {
    return 2
  }
  if (resMap[n]) {
    return resMap[n]
  }
  // key 保存计算的结果
  var res = findRes2(n-1) + findRes2(n-2)
  if (n === 10) {
    console.log('n到 10了。。。') // 体特殊条件打印，可以用于调试
    console.log('n到 10的结果：。。。', res)
  }
  resMap[n] = res
  return res
}
var res1= findRes2(10)
console.log('res:', res1)