// 数组最大不相邻序列和
var arr = [1,2,4,1, 7,8 ,3]
  //      /   分为选和不选
  //     /   arr[0] n = 0
  // OPT(n)  max(arr[0], arr[1]) n = 1
  //    \    max(OPT(n-1) + arr[n], OPT(n-2)) 当 n > 2
  //     \
// 递归形式
function maxSub(arr, n) {
  // 递归出口
  if (n === 0) {
    return arr[0]
  } else if (n === 1) {
    return Math.max(arr[0], arr[1]);
  }
  var A = maxSub(arr, n - 2) + arr[n]
  var B =  maxSub(arr, n - 1)
  return Math.max(A, B)
}

const result = maxSub(arr, arr.length - 1)
console.log('result:', result) // 13

// 非递归形式，动态规划

function maxSubDep(arr) {
  if (arr.length === 1) {
    return arr[0]
  }
  var resArr  = [arr[0], Math.max(arr[0], arr[1])]
  for (var i = 2; i < arr.length; i ++ ) {
    var a = resArr[i - 2] + arr[i]
    var b = resArr[i - 1]
    // key 创建一个数组，来保存 前 i 个元素的 最大不相邻序列和 结果，避免重复计算。
    resArr[i] = Math.max(a, b)
  }
  console.log('resArr:', resArr)
  return resArr[arr.length - 1]
}

const resArr2 = maxSubDep(arr)
console.log('动态规划算法：', resArr2)