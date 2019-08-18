// 参考： http://blog.leanote.com/post/weibo-007/%E5%9F%BA%E7%A1%80c%E6%9C%80%E5%A4%A7%E5%AD%90%E6%95%B0%E7%BB%84%E9%97%AE%E9%A2%98%E6%B1%82%E8%A7%A3
// 1. 第一种解法最简单，最暴力(也称暴力破解法)，
//  最容易理解的一种方法。这种解法的思想就是，
//  算法的时间复杂度为O(n^2)
//  从第一个元素开始，然后和后面的所有元素组合，看有没有可能形成最大值。代码很简单

// 最大连续子数组如果包括第一个元素，则用第一个元素和后面的 arr.length - 1 个元素做分表组成数组，然后做比较，记录 下 maxSum 和 begin, end
// 一轮循环下来，得到了包含第一个元素的所有连续子数组 中 的那个最大连续子数组，接下来，计算 数组第一个元素是 -2 的子数组....

const givenArr =  [ 1, -2, 3, 10, -4, 7, 2, -5 ]

function getMaxSubArr1(arr) {
  let begin = 0
  let end = 0

  for (let i = 0, len = arr.length; i < len; i++) {
    // 初始值化的当前total 为 每个分数组的第一个元素
    let tmpTotal = givenArr[i]
    for (j = i + 1; j < len; j++) {
      tmpTotal = tmpTotal + arr[j]
      if (tmpTotal > maxSum) {
        console.log('here...')
        // 记录下标
        begin = i
        end = j
        maxSum = tmpTotal
      }
    }
  }
  return {
    begin,
    end,
    maxSum
  }
}

const res1 = getMaxSubArr1(givenArr)
console.log('res1:', res1) // { begin: 2, end: 6, maxSum: 18 } [ 3, 10, -4, 7, 2 ]