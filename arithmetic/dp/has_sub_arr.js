// 数组中是否存在若干和为sum的情况

var arr = [3, 34, 4, 12, 5, 2]

// 递归方法
var res = []
function subSetRec(arr, i, s) {
  if (s === 0) {
    return true
  } else if (i === 0) {
    return arr[0] === s
  } else if (arr[i] > s) {
    return subSetRec(arr, i-1, s)
  }
  var a = subSetRec(arr, i-1, s - arr[i])
  var b = subSetRec(arr, i-1, s)
  return a || b;
}

var result1 = subSetRec(arr, arr.length-1, 9); // true
var result2 = subSetRec(arr, arr.length-1, 13); // false

// 动态规划版

function subSetDep(arr, s) {
  var resArr = []
  for (var i = 0; i < arr.length; i++) {
    // 每一行的第一个 元素 结果都为 true
    resArr.push([true, ...new Array(s-1)])
  }

  // 处理第一行， 只有 s === arr[0] 时才为 true, 其余为 false
    for (var j = 0; j < s; j++) {
      if (arr[0] === j) {
        resArr[0][j] = true
      } else {
        resArr[0][j] = false
      }
    }


  // 处理剩下的 这个地方有点问题。 待处理 // TODO
  for (var k = 1; k < arr.length; k++) {
    for (var h = 1; h < s + 1; h++) {
      if (arr[k] > s) {
        resArr[k][h] = resArr[k-1][h]
      } else {
        var a = resArr[k-1][h-arr[k]]
        var b = resArr[k-1][h]
        resArr[k][h] = a || b
      }  
    }
  }

  console.log('resArr:', resArr)
  return resArr[arr.length -1][s -1]
}

// var res2 = subSetDep(arr, 13)
// // var res3 = subSetDep(arr, 13)
// console.log('res2:', res2)
// // console.log('res3:', res3)