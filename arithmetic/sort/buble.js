/**
 * 冒泡排序: 最好情况时间复杂度：O(n), 最坏情况时间复杂度： O(n²), 平均情况复杂度就是O(n²)。
 * 稳定性： 是稳定的算法
 */

 /* 
 * 最原始版冒泡排序： n 轮比较， 每轮进行一次遍历，依次比较相邻两元素，遇到大小规则不符合的就交换两个元素。
 * 第 1 轮比较结束后，数组最右边得到一个最值（最大/最小值）
 * 第 2 轮比较结束后，数组倒数第二个元素得到第二个最值（最大/最小值）
 * ...
 * 第 n 轮后，数组第一个元素得到第 n 个最值。此时，完成排序。
 */
var arr = [4,5,6,3,2,1] // 从小到大排序
var tmp = 0
for (var j = 0; j < arr.length; j ++) {
 for (var i = 0; i < arr.length; i++) {
   if (arr[i] > arr[i+1]) {
     tmp = arr[i]
     arr[i] = arr[i+1]
     arr[i+1] = tmp
   }
  }
  console.log('第'+j+'轮排序后结果', arr)
}

/**
 * 优化版本 1， 其实，每一轮比较结束后，数组都得到一个最值，依次放在最后面。
 * 比如： 第一轮结束后，数组最后那个元素就是最值，它肯定不需要和它的前一个元素再比较了。
 * 下一轮比较的时候，其实可以不用比较 最后两个元素的大小了，依次类推
 *  
 **/ 
var arr = [4,5,6,3,2,1] // 从小到大排序
var tmp = 0
for (var j = 0; j < arr.length; j ++) {
 // key: arr.length - j 每一轮元素比较后，比较次数都减 1
 for (var i = 0; i < arr.length - j; i++) {
   if (arr[i] > arr[i+1]) {
     tmp = arr[i]
     arr[i] = arr[i+1]
     arr[i+1] = tmp
   }
  }
  console.log('第'+j+'轮排序后结果', arr)
}

/**
* 优化版本 3
* 排序过程中，很可能在某轮结束后，数据就已经是有序的了，无需进行下一次排序。
* 那怎么判断数据是否是有序的了呢？
* 如果一轮比较下来，没有发生过 1 次数据交换，那么，数据其实就是已经是有序的了。
* 每轮比较后，我们可以依据 此轮比较是否至少发生过一次交换来判断 是否进行后续的轮数。
**/ 

var arr2 = [4,5,6,3,2,1] // 从小到大排序
var arr = [3,5,4,1,2,6] // 从小到大排序
var tmp = 0
var isSwap = false
for (var j = 0; j < arr.length; j ++) {
 // key: arr.length - j 每一轮元素比较后，比较次数都减 1
 for (var i = 0; i < arr.length - j; i++) {
   if (arr[i] > arr[i+1]) {
     tmp = arr[i]
     arr[i] = arr[i+1]
     arr[i+1] = tmp
     isSwap = true
   }
  }
  if (!isSwap) {
    console.log('数据已经有序，排序结束，当前进行到第' + j + '轮排序')
    break;
  }
 isSwap = false
 console.log('第'+ j +'轮排序后结果', arr)
}
console.log('排序后结果:', arr)

