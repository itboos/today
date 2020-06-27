// 回溯算法

console.log('周天加油~')

/**
 * 
 * @param {Array} nums 一个无重复数字的数组
 * @returns {Array[[Array]]} 返回一个二维数组， 每一个元素是一种排列结果
 */
function getFullPermutation(nums) {
  // 路径 list
  const  track = []
  // 结果 arr
  const resultArr = []
  backTrack(nums, track, resultArr)
  return resultArr
}

function backTrack(nums, track, resultArr) {
  // 结束条件， 选择列表为空时， 也就是 track 的 长度 等于 nums 数组的长度时。
  if (track.length === nums.length) {
    return resultArr.push([...track])
  }
  // 回溯
  for (let i = 0; i < nums.length; i++) {
    // 这里没有保存 选择列表，而是根据 track 路径里是否包含 nums[i] 来判断的
    if (track.includes(nums[i])) {
      continue
    }
    // 做选择
    track.push(nums[i])
    // 进入下一层决策树
    backTrack(nums, track, resultArr)
    // 取消选择
    track.pop()
  }
}


var resultArr = []

function permute(nums) {
  // 路径 list
  const  track = []
  // 结果 arr
  backTrack(nums, track)
  return resultArr
}

function backTrack(nums, track) {
  // 结束条件， 选择列表为空时， 也就是 track 的 长度 等于 nums 数组的长度时。
  if (track.length === nums.length) {
    return resultArr.push([...track])
  }
  // 回溯
  for (let i = 0; i < nums.length; i++) {
    // 这里没有保存 选择列表，而是根据 track 路径里是否包含 nums[i] 来判断的
    if (track.includes(nums[i])) {
      continue
    }
    // 做选择
    track.push(nums[i])
    // 进入下一层决策树
    backTrack(nums, track)
    // 取消选择
    track.pop()
  }
}
const res1 = permute([1,2,3])
// const res2 = getFullPermutation([1, 2, 3, 4])
console.log('[1, 2, 3]的全排列为:', res1)
// console.log('[1, 2, 3, 4]的全排列为:', res2)

