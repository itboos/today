/**
 * 计算 斐波那契数列的第 n 项
 * 从前往后计算, 动态规划思路, O(n) 迭代方法
 * @param {Number} n 
 */
function fib(n) {
  if ( n<= 2 ) {
    return 1
  }
  var resultArr = [0, 1, 1] 
  // base case arr[1] 表示斐波那契数列的第一项, arr[2] 表示斐波那契数列的第二项
  for (var i = 3; i <= n; i++) {
    resultArr[i] = resultArr[i - 1] + resultArr[i - 2]
  }
  return resultArr[n]
  // 1, 1, 2, 3, 5, 8, 12
  console.log('res:', prevOne)
}
// fib(3)
// fib(4)
// fib(5)
// fib(6)
// fib(7)
// fib(100) 354224848179262000000


/**
 * 带缓存版本的 计算方法， 重叠子问题只计算一次，缓存了每个子问题的结果
 * 时间复杂度为 O(n), 效率已经接近迭代版本的动态规划.
 * @param {Number} n 
 * @param {Object} fibMap 
 */
function fibWithMemorize(n, fibMap) {
  if (typeof fibMap === 'undefined') {
    fibMap = {}
  }
  if (n <= 2 ) { return 1 }
  if (fibMap[n]) {
    return fibMap[n]
  }
  fibMap[n] = fibWithMemorize(n-1, fibMap) + fibWithMemorize(n-2, fibMap);
  return fibMap[n]
}

// fibWithMemorize(3)
// fibWithMemorize(4)
// fibWithMemorize(5)
// fibWithMemorize(6)
// fibWithMemorize(7)
var result= fibWithMemorize(100)
// fib(45)
console.log('result:', result) // 354224848179262000000
