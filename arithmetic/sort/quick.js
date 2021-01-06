/**
 *  快速排序: 
 *   思路：
 *       
 *   时间复杂度未： O(nlogn)
 * 
 *   空间复杂度： O(logn)
 *              
 * 
 *   最好情况时间复杂度： O(nlogn)
 * 
 *   最坏情况时间复杂度： O(n²) 
 * 
 *   平均情况时间复杂度： O(n log n) 不管有序无序，都要执行 n 次比较。
 *   
 *   稳定性： 不稳定，因为关键字的比较和交换是跳跃进行的
 *   desc: 维基百科： https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F
     平均性能最好
 * */

 // 参考：https://blog.csdn.net/weshjiness/article/details/8660583
 // http://data.biancheng.net/view/117.html

//  https://blog.csdn.net/qq_36528114/article/details/78667034

 // 空间复杂度为 2n 的一种实现, 比较好理解, 针对 js concat 特性 来的
 Array.prototype.quickSort = function() {
  const l = this.length
  if(l < 2) return this
  const basic = this[0], left = [], right = []
  for(let i = 1; i < l; i++) {
    const iv = this[i]
    iv >= basic && right.push(iv)
    iv < basic && left.push(iv)
  }
  return left.quickSort().concat(basic, right.quickSort())
}
const arr = [5, 3, 7, 4, 1, 9, 8, 6, 2];
// const ascendArr = arr.quickSort()
// console.log('ascendArr:', ascendArr)

// 常规思路，递归

function QuickSort(arr, left, right) {
  if (left >= right) return // 表示已经完成一个组
  var index = PartSort(arr, left, right) // 基准值的位置
  console.log('arr:', index, arr)
  QuickSort(arr, left, index - 1)
  QuickSort(arr, index + 1, right)
}


// PartSort 有多种实现方式，三数取中，左右指针法等。

// 左右指针法
function PartSort(arr, left, right) {
  var base = arr[right]
  var i = left, j = right;
  while(i < j) {
    // 从左往右找第一个 大于 基数的数
    while(i < j && arr[i] <= base) {
      i++
    }
    // 从右往左找第一个 小于 基数的数
    while(i < j && arr[j] >= base) {
      j--
    }
    console.log(i, j)
    // 交换两数
    if (i < j) {
      swap(arr, i, j)
    }
  }
  // 将 基数归位
  swap(arr, right, i)
  // console.log('arr:', arr)
  return i
}

function swap(arr, a, b) {
  var tmp = arr[a]
  arr[a] = arr[b]
  arr[b] = tmp
}
var arr2 = [5, 3, 7, 4, 1, 9, 8, 6, 2];
QuickSort(arr2, 0, arr2.length-1)
console.log('arr2:', arr2)