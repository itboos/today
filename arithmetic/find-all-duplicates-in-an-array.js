/**
 * desc: 442. 数组中重复的数据
 * letcode: https://leetcode-cn.com/problems/find-all-duplicates-in-an-array/
 * 给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）, 
 * 其中有些元素出现两次而其他元素出现一次。
 * 找到所有出现两次的元素。
 * 要求： 不用到任何额外空间并在O(n)时间复杂度内解决这个问题
 */

/*
思路： 要不使用额外内存空间，则只能原地修改数组元素来标记是否访问过 （原地  hash, 标记数组索引）
原理：如果是相同的元素，那么以他们为索引的元素值一定是同一个值，因此可以修改该值来标记是否被访问过
注意：既要原地修改元素，就不能影响其自身作为索引的访问，那么只有一种办法，
那就是将该元素取反，或者加减某个数，在访问的时候，再通过取正或者加减某个数还原回来

输入输出的空间不属于额外空间，可以在输入数组中用数字的正负来表示该位置所对应数字是否已经出现过。
遍历输入数组，对改数字取绝对值，如果此索引-1 位置元素的值 > 0, 则说明前面未出现过， 给此元素取反。
否则，则说明出现过，直接放入结果数组中
key: 此题关键是 输入元素 的值 刚好在 [1, n] 之间的正整数，否则，此方法会出现数组下标越界的问题（js 里不存在）
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
  const result = []
  for (let i = 0; i < nums.length; i++) {
      const num = Math.abs(nums[i])
      if (nums[num -1] > 0) {
          nums[num -1] *= -1
      } else {
          result.push(num)
      }
  }
  return result
};

// eg: 输入 [4,3,2,7,8,2,3,1] => [2, 3]

/**
 * @desc 更通用的查找出现 n 次 元素的算法 利用 hashMap, js 里的 obj 或者 Map
 * @param {number[]} nums 
 * @param {number} n 
 * @return {number[]}
 * 思路： 遍历数组，以数组 元素 作为 key,  出现的次数作为 value, 遍历结束后，
 * 得到了此数组所有元素出现次数的一个 map, 然后再遍历次 map 找出值为 n 的 那些 key 即可
 * 性能分析： 输入输出的空间不属于额外空间, 
 * 时间复杂度 O(n) 就是两次遍历的时间
 * 空间复杂度 O(1) 对象的空间复杂度记 为 1
 */
var findDuplicatesN = function(nums, n) {
  const result = []
  const valueMap = {} // key: num, value: count(改 num 出现的次数)
  for (const num of nums) {
    valueMap[num] = valueMap[num] !== undefined ? valueMap[num] + 1 : 1
  }
  // console.log('valueMap:', valueMap)
  for (const key in valueMap) {
    if (valueMap[key] === n) {
      result.push(parseInt(key, 10))
    }
  }
  return result
}

// var res1 = findDuplicatesN([4,3,2,7,8,2,3,1], 2)
// console.log('res1:', res1)
// var res2 = findDuplicatesN([4,3,2,7,8,2,3,1, 3, 4, 4], 3)
// console.log('res2:', res2)




/**
 * @desc 448. 找到所有数组中消失的数字
 * 给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，
 * 另一些只出现一次。
 * 要求： 不使用额外空间且时间复杂度为 O(n)
 * @param {number[]} nums 
 * 思路： 不使用额外的存储空间，则考虑原地 hash,
 * 实际上相当于利用正负号构建了一个简易的哈希表, 用来存储每个数字的状态.
 * 遍历目标数组，将 nums[num -1] 的值设置成负值， 标识 num 元素存在
 * 然后，再次遍历转换后的数组，判断 i-1 对应的元素的正负性。
 * eg: [4,3,2,7,8,2,3,1] => 转换为 -> [-4, -3, -2, -7, 8, 2, -3, -1]
 * 索引值 对应的元素如果为 负数，则说明 此索引对应的正整数存在，否则，则放入结果数组里
 * 比如：第一个元素 -4 , 值为负数，代表 1 存在， 以此类推
 * 性能分析： 输入输出的空间不属于额外空间, 
 * 时间复杂度 O(n) 就是两次遍历的时间
 * 空间复杂度 O(1) 对象的空间复杂度记 为 1
 */
var findDisappearedNumbers = function(nums) {
  const result = []
  for (let i = 0; i < nums.length; i++) {
      const num = Math.abs(nums[i])
      // 注意 这里，已经是负数的元素就不要再 * -1 了，否则又变成正数了。
      if (nums[num -1] > 0) {
        nums[num -1] *= -1
      }
  }
  // console.log('nums:', nums)
  for (let j = 1; j <= nums.length; j++) {
     if (nums[j-1] > 0) {
        result.push(j)
     }
  }
  return result
};

var res3 = findDisappearedNumbers([4,3,2,7,8,2,3,1])
console.log('res3:',  res3) // [5,6]


// 变形： 找出 只出现一次的元素

/**
 * @desc 给定一个整数数组 a, 其中 n 为任意自然数，其中，数组中只有一个元素只出现一次，
 *  其它元素出现两次以及两次以上，需求找到这个只出现一次的元素
 * @param {numbers} nums 
 * 思路： 
 * 方法 1： 最先想到的应该是 hashMap 法，以 value 为 key, 出现次数 为 value 构建 map
 * 然后，遍历 map, 知道值 为 1 的 key， 这个数就是我们要找的数。
 * 方法 2：利用题目给的特性，只有一个元素只出现一次, 我们先对数组排序，
 * 然后进行遍历, 遍历的时候 将 当前元素 和 后一个 元素做比较，如果不相等的话，则 return 此元素
 * key: 关键是利用了排序，排序好的数组 相等的元素必定相邻这个特性。
 * 性能分析： 输入输出的空间不属于额外空间, 
 * 时间复杂度 O(n/2 + logN) 就是排序算法的时间复杂度， O(logN), 遍历的平均复杂度 为  n/2
 * 空间复杂度 O(1) 空间复杂度记 为 1， 无需额外的存储空间.
 * 感觉整体 的时间复杂度 没有 hashMap 的好
 * ps: 如果是已经排好序的话，此方法显然效率更高
 */
var findTheOnlyOne = function(nums) {
  num.sort()
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]!== num[++i]) {
      return nums[i]
    }
  }
  return null
}