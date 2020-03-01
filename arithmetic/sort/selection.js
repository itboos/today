/**
 *  选择排序: 
 *   思路：取数组第一个元素作为已排序区间，剩余的数作为未排序区间，
 *       找出剩余未排序区间的最小的一个数, 插入到已排序数组末尾，直到找到最后那个最小数。 
 *       每次将一个数插入到有序的数组中去(初始一个数字自然有序)。
 * 
 *   时间复杂度未： O(n²）
 * 
 *   空间复杂度： O(1) 选择排序算法的运行并不需要额外的存储空间，所以空间复杂度是O(1)，也就是说，这是一个原地排序算法
 *              
 * 
 *   最好情况时间复杂度： O(n²), 
 * 
 *   最坏情况时间复杂度： O(n²) 
 * 
 *   平均情况时间复杂度： O(n²) 不管有序无序，都要执行 n 次比较。
 *   
 *   稳定性： 不稳定, 选择排序每次都要找剩余未排序元素中的最小值，并和前面的元素交换位置，这样破坏了稳定性。

 * */

// const res1 = insertSort([4,4,5,6,1,3,2]) // [1,2,3,4,5,6]
// console.log('res1:', res1)

// 更常见的插入排序
function insertSort2(arr) {
  let pos = -1
  let tmp = 0
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i]
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < min) {
        // 记录索引
        pos = j
        // 记录当前最小值
        min = arr[j]
      }
    }
    // console.log('pos:..', pos)
    // 交换两个元素的位置
    if (pos > 0) {
      tmp = arr[i]
      arr[i] = min
      arr[pos] = tmp
    }
    pos = -1
  }
}
// example
let arr2 = [4,4,5,6,1,3,2]
insertSort2(arr2)
console.log('[4,4,5,6,1,3,2] 排序后：', arr2);