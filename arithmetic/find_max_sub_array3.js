// 方法3： 动态规划：
// 参考： https://blog.51cto.com/4837471/2352785  https://blog.csdn.net/jclian91/article/details/80600477

// 也是将待求解的问题分解为若干个子问题（阶段），按顺序求解子阶段，前一子问题的解，为后一子问题的求解提供了有用的信息。在求解任一子问题时，列出各种可能的局部解，通过决策保留那些有可能达到最优的局部解，丢弃其他局部解。依次解决各子问题，最后一个子问题就是初始问题的解。
// 由于动态规划解决的问题多数有重叠子问题这个特点，为减少重复计算，对每一个子问题只解一次，将其不同阶段的不同状态保存在一个二维数组中。


// 用MS[i]表示最大子数组的结束下标为i的情形(即前i个元素数组中的最大子元素数组)，则对于i-1，有：
// MS[i]=max{ MS[i−1]+A[i], A[i] } i >= 1
// 出口: MS[0]= arr[0] i = 0
//  ———————————————— 

function getMaxSubArr3(arr) {
  const ms = new Array(arr.length)
  if (arr.length === 1) {
    return arr[0]
  }
  ms[0] = arr[0] // 动态规划记录, ms[i] 表示前 i 个元素的最大子数组 的和
  for (let i = 1, len = arr.length; i < len; i++) {
    ms[i]= Math.max(ms[i-1] + arr[i], arr[i])
  }

  const maxSum = Math.max(...ms)
  console.log('maxSum:', maxSum, ms)
  return maxSum
}

function getMaxSubArr4(arr) {
  const ms = new Array(arr.length) // 动态规划记录, ms[i] 表示前 i 个元素的最大子数组 的和
  if (arr.length === 1) {
    return arr[0]
  }
  ms[0] = arr[0]
  let maxSubNum = arr[0] //最大值初始为第一个数
  let temp = 0
  let start = 0
  let end = 0
  for (let i = 1, len = arr.length; i < len; i++) {
    if (ms[i-1] < 0) { // 前面的<0，直接丢
      ms[i] = arr[i]
      temp = i // 记录起始位置
    } else {
      ms[i] = ms[i-1] + arr[i] //往后求和
    }
    if (ms[i] > maxSubNum )  { //找到到i为止的最大子数组
      maxSubNum  = ms[i]  //最大...
      start = temp //标记起始
      end = i  //标记此时的结束位置
    }
  }
  return { start, end, sum: maxSubNum }
}

const givenArr =  [ 1, -2, 3, 10, -4, 7, 2, -5 ]

const res1 = getMaxSubArr4(givenArr)
console.log('res1:', res1) // maxSum: 18
