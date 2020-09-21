/**
 * desc:  三数之和
 * 解法 2: https://leetcode-cn.com/problems/3sum/solution/hua-jie-suan-fa-15-san-shu-zhi-he-by-guanpengchn/
 */

 // 解法 1：  借助两数之和方法 更通用非方法
 var threeSum1 =  function(nums) {
   var target = 0
   var tupleArr = []
   var result = []

  var sortedNums = nums.slice(0).sort((a, b) => a-b)
  var len = sortedNums.length
  for (var i = 0; i < len -1; i++) {
    tupleArr = twoSumTarget(sortedNums, i + 1, target - sortedNums[i])
    // console.log('tupleArr:', tupleArr)
    for (var j = 0; j < tupleArr.length; j++) {
      result.push([sortedNums[i], ...tupleArr[j]])
    }
    // 跳过第一个数字重复的情况，否则会出现重复结果， 使得第一个元素不重复
    while (i < len - 1 && sortedNums[i] == sortedNums[i + 1]) i++;
  }
   return result
 }

 function twoSumTarget(sortedNums, start, target) {
  var low = start, high = sortedNums.length  - 1;
  var result = []
  while(low <  high) {
    var left = sortedNums[low],
        right = sortedNums[high]
    var  sum = left + right
    if  (sum > target) {
      // 跳过相同的元素
      while(low <  high && sortedNums[high] === right) {
        high = high - 1 
      }
    } else if (sum < target) {
      // 跳过相同的元素  
      while(low <  high && sortedNums[low] === left) {
        low = low + 1 
      }
    } else  {
      // sum = target
      result.push([left, right])
      // 移动左右指针，跳过重复元素
      while(low <  high && sortedNums[high] === right) {
        high = high - 1 
      }
      while(low <  high && sortedNums[low] === left) {
        low = low + 1 
      }
    }
  }
  return result
 }


var res = threeSum1([-1, 0, 1, 2, -1, -4], 9)
console.log('res:', res)


/**
 * @param {number[]} nums
 * @return {number[][]}
 * desc: 只针对 三数之和为 0
 */
// 作者：guanpengchn
// 链接：https://leetcode-cn.com/problems/3sum/solution/hua-jie-suan-fa-15-san-shu-zhi-he-by-guanpengchn/
// 来源：力扣（LeetCode）

var threeSum2 = function(nums) {
  let ans = [];
  const len = nums.length;
  if(nums == null || len < 3) return ans;
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len ; i++) {
      if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
      if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
      let L = i+1;
      let R = len-1;
      while(L < R){
          const sum = nums[i] + nums[L] + nums[R];
          if(sum == 0){
              ans.push([nums[i],nums[L],nums[R]]);
              while (L<R && nums[L] == nums[L+1]) L++; // 去重
              while (L<R && nums[R] == nums[R-1]) R--; // 去重
              L++;
              R--;
          }
          else if (sum < 0) L++;
          else if (sum > 0) R--;
      }
  }        
  return ans;
};