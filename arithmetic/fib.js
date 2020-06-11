/**
 * 计算 斐波那契数列的第 n 项
 * 从前往后计算, 动态规划思路, O(n)
 * @param {Number} n 
 */
function fib(n) {
  if ( n<= 2 ) {
    return 1
  }
  var prevOne = 1; // 2
  var prevTwo = 1; // 1
  var now = 0;
  for (var i = 3; i <= n; i++) {
    now = prevOne + prevTwo // 3
    prevTwo = prevOne // 2
    prevOne = now // 3
  }
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
