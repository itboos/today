// 方法 2： 分治策略 时间复杂度为O(nlogn)

// 把原数组进行分割，也就是将原数组划分为规模尽量相同的子数组。那么，就需
// 要找到原数组的重点 mid，然后分别对原数组的 mid 左边和右边进行处理。
// 那么，最大子数组所处的位置必然是下面三种情况之一【i, j 为结果范围下标】：
//     · 完全位于子数组 A[low, mid]中，因此 low <= i <= j <= mid.
//     · 完全位于子数组A[mid + 1, high] 中，因此 mid < i <= j <= high.
//     · 跨越中点，因此 low <= i <= mid < j <= high
// 实际上，数组 A 的最大子数组必然是上面三种情况中的最大者。那么，我们只需要找
// 到上面三种情况的最大者即可。
//     那么，我们就可以递归地求解子数组 A[low, mid]，A[mid + 1, high] 的最大
// 子数组，因为这仍然是求解最大子数组问题，然后将这两者的值和两者和中点组成的组数组
// 三者中寻找最大值。

// FIND-MAXIMUM-CROSSING-SUBARRAY(A, low, mid, high):
//     left-sum = -∞
//     sum = 0;
//     for i = mid downto low:
//         sum += A[i]
//         if left-sum < sum:
//             left-sum = sum
//             max-left = i
//     right-sum = -∞
//     sum = 0;
//     for i = mid + 1 to high:
//         sum += A[i]
//         if right-sum < sum:
//             right-sum = sum
//             max-right = i
//     return (max-left , max- right, left-sum + right-sum)
// 查找跨越中点的子数组, 必定包含中间元素，则从中间往两边查找子数组
function findMaximumCrossingSubArray(arr, low, mid, high) {
  let leftSum = -Infinity
  let rightSum = -Infinity
  let sum = 0;
  let maxLeft = low
  let maxRight = high
  // 中间往左边找
  for (let i = mid; i >= low; i--) {
    sum += arr[i]
    if (leftSum < sum) {
      leftSum = sum
      // console.log('left:', leftSum)
      maxLeft = i
    }
  }
  sum = 0
  // 中间往右边找
  for (let j = mid + 1; j <= high; j++) {
    sum += arr[j]
    if (rightSum < sum) {
      rightSum = sum
      // console.log('right:', sum)
      maxRight = j
    }
  }
  console.log('leftSum + rightSum:', leftSum, rightSum)
  return {
    low: maxLeft,
    high: maxRight,
    sum: leftSum + rightSum
  }
}

// FIND-MAXIMUM-SUBARRAY(A, low, high):
//     if high == low:
//         return (low, high, A[low])         // 只有一个元素，那么最大值就是这个元素值
//     else mid = [(low + high) / 2]
//         (left-low, left-high, left-sum) = FIND-MAXIMUM-SUBARRAY(A, low, mid)
//         (right-low, right-high, right-sum) = FIND-MAXIMUM-SUBARRAY(A, mid + 1, high)
//         (cross-low, cross-high, cross-sum) = FIND-MAXIMUM-CROSSING-SUBARRAY(A, low, mid, high)
//         if left-sum >= right-sum && left-sum >= cross-sum:
//             return (left-low, left-high, left-sum)
//         if right-sum >= right-sum && right-sum >= cross-sum:
//             return (right-low, right-high, right-sum)
//         else
//             return (cross-low, cross-high, cross-sum)
// 查找mid 元素 左右两边的子数组 递归查找
function findMaximumSubArray(arr, low, high) {
  if (high < low) {
    throw new Error("索引值错误，low值一定不能比high值大");
  }
  if (high === low) {
    return {low, high, sum: arr[low] }   // base case 只有一个元素的子数组，那么最大值就是这个元素值
  }
  const mid = Math.floor((low + high) / 2)
  console.log('mid:', mid)
  // 找左边的最大子数组
  const left = findMaximumSubArray(arr, low, mid)
  // 找包含中间元素最大子数组
  const right = findMaximumCrossingSubArray(arr, low, mid, high)
  // 找右边的最大子数组
  const cross = findMaximumSubArray(arr, mid + 1, high)

  if (left.sum >= right.sum && left.sum >= cross.sum) {
    return left
  } else if (right.sum >= left.sum && right.sum >= cross.sum) {
    return right
  } else {
    return cross
  }
}

const givenArr =  [ 1, -2, 3, 10, -4, 7, 2, -5 ]
const res = findMaximumSubArray(givenArr, 0, givenArr.length - 1)
console.log('res:', res)