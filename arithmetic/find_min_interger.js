// 查找缺失的正整数
// 实现js方法，查找第一个缺失的正整数。 （正整数是从 1，2，3...N）的

// Example 1:
// Input: [1,2,0] Output: 3 
// Example 2:
// Input: [3,4,-1,1] Output: 2 
// Example 3:
// Input: [7,8,9,11,12] Output: 1

// desc: 时间复杂度 O(n²)， 暴力破解法
function findMinN(arr) {
  let j = 1
  let isFind = false
  const maxNum = arr.length + 1

  while(j <= maxNum) {
    for(let i = 0; i < arr.length; i++) {
      if (j === arr[i]) {
        // console.log('here:', j)
        isFind = true
        break;
      }
    }
    if (!isFind) {
      console.log('res:', j)
      return j
    }
    j++
    isFind = false
  }
}

// 时间复杂度未 O(n), 空间复杂度为 O(1)
function findMinN2(arr){
  const fMap = []
  for(var i = 0; i <= arr.length ; i++) { 
    fMap.push(i+1)
  }
  for(var j = 0; j <= fMap.length;  j++) {
    if (arr.indexOf(fMap[j]) >= 0) {
      // console.log('继续查找')
      continue
    }
    break;
  }
 console.log('res:', j+1)
}

findMinN([1,2,3]) // 4
findMinN([1,2,3,-1]) // 4
findMinN([1,2,3,-1,4, 5,-1, 6, 7, 9, 9, 10]) // 6
findMinN([-1,-2, 0,-3]) // 1