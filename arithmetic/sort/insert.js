/**
 *  插入排序: 
 *   思路：取数组第一个元素作为已排序区间，剩余的数作为未排序区间，
 *       依次取未排序区间的一个数插入到已排序区间，直到为未排序区间为空。 
 *       每次将一个数插入到有序的数组中去(初始一个数字自然有序)。
 * 
 *   时间复杂度度： O(n²）
 * 
 *   空间复杂度： O(1) 插入排序算法的运行并不需要额外的存储空间，所以空间复杂度是O(1)，也就是说，这是一个原地排序算法
 * 
 *   最好情况时间复杂度： O(n), 排序一个已经有序的数组，每次只需要比较一次，然后插入到数组末尾
 * 
 *   最坏情况时间复杂度： O(n²) 数组时我们想要结果的倒序数组，没一次插入到要移动数组的全部元素
 * 
 *   平均情况时间复杂度： O(n²) 在数组中插入一个数据的平均时间复杂度是多少吗?没错，是O(n)。
 *      所以，对于插入排序来说，每次插入操作都相当于在数组中插入一个数据，循环 执行n次插入操作，所以平均时间复杂度为O(n²)。
 *   稳定性： 稳定 对于值相同的元素，我们可以选择将后面出现的元素，插入到前面出现元素的后面，
 *              这样就可以保持原有的前后顺序不变，所以插入排序是稳定的排序算法。
 * */

 // 原始版，不改变输入数组的情况下。
 function insertSort(arr) {
  const sortedArr = arr.slice(0,1)
  const restArr = arr.slice(1)
  let pos = -1

  // 从小到大排序
  for (let i = 0; i < restArr.length; i++) {
    // console.log('arr:', restArr[i])
    for (let j = 0; j < sortedArr.length; j++) {
      // 注意： 这里使用 >= 是为了 让值相同的元素插入到值相同的元素后面，保持了原数组相同值的顺序未改变。
      if (restArr[i] >= sortedArr[j]) {
        // 记录最终要插入的位置
        pos = j + 1
      }
    }
    console.log('pos：', pos)
    // 中间位置，对头插入
    if (pos < sortedArr.length -1) {
      for (let k = sortedArr.length -1; k >= pos; k--) {
        sortedArr[k+1] = sortedArr[k]
      }
      const p = pos > -1 ? pos : 0
      sortedArr[p] = restArr[i]
    } else {
      // 数据在末尾插入
      sortedArr.push(restArr[i])
    }
    pos = -1
   
    console.log('sortedArr:', sortedArr)
  }
  return sortedArr
}
const res1 = insertSort([4,4,5,6,1,3,2]) // [1,2,3,4,5,6]
console.log('res1:', res1)

// 更常见的插入排序
function insertSort2(arr) {
  let length = arr.length
  for (let i = 1; i < length; i++) {
    let tmp = arr[i]
    let j = i
    // 从后往前找..
    for (; j > 0; j--) {
      if (tmp >= arr[j-1]) {
        break // 当前考察数大于前一个数，证明已找到插入位置，退出循环
      }
      arr[j] = arr[j-1] // 数往后移动一位
    }
    arr[j] = tmp
  }
}
// example
let arr2 = [2,5,10,7,10,32,90,9,11,1,0,10]
console.log(insertSort(arr2));