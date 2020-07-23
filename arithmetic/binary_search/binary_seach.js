/**
 * desc: 二分查找， 又称为折半查找
 * 是一种在 有序 线性表（如数组）里查找数据的高效方式
 * 时间复杂度: O(logn)
 * 查找次数： n/2k =1 二的 k 次方 的解， k=log2n，忽略低阶系数， 即为查找次数
 * 空间复杂度： O(1) 利用原数组，无需创建额外的数组空间, 只有几个指针。
 */

// 1.非递归实现
/**
 * 
 * @param {Array} arr 
 * @param {*} value 
 * @returns {Number} index
 */
function binarySearch(arr, value) {
  var low = 0,
      high = arr.length - 1,
      mid = 0;
  var count = 0
  while(low <= high) {
    mid = Math.floor((high + low) / 2);
    count ++
    console.log('第 ' + count + ' 次查找,' + ' mid=' + mid);
    if (arr[mid] === value) return mid;
    if (arr[mid] > value) {
      high = mid - 1;
    }
    if (arr[mid] < value) {
      low = mid + 1;
    }
  }
  return -1;
}

var arr = [0,1,2,3,4,5,6,7,8,9,10, 11]
// console.log(binarySearch(arr, 7)); // 7

// 2. 递归实现

// 写递归思路: 1、找到递归公式，2、找到递归终止条件

function binarySearch2(arr, low, high, value) {
  var  mid =  Math.floor((high + low) / 2);

  // 递归终止条件
  if (low > high) {
    return -1
  }
  if (arr[mid] === value) {
    return mid
  }

  if (arr[mid] > value) {
    // high = mid - 1;
    return binarySearch2(arr, low, mid - 1, value);
  }
  // arr[mid] < value : low = mid + 1;
  return binarySearch2(arr, mid + 1, high, value);
}

var res = binarySearch2(arr, 0, arr.length-1, 1);
// console.log('res:', res);

// 题目： 编程实现求一个数的平方根，要求精确到小数点后 6 位 
// 思路： 用二分查找的方式求平方根
function getSquare(x) {
  var low = 0,
      mid = x/2,
      high = x;
  var count = 0;
  while(Math.abs((Math.pow(mid,2) - x)) > 0.000001) {
    // console.log('xxx', Math.abs((Math.pow(mid,2) - x)))
    count++
    if (Math.pow(mid,2) < x) {
      low = mid
    } else {
      high = mid
    }
    mid = (low + high) / 2;
  }
  // console.log('mid', mid)
  // return mid.toFixed(6);
  console.log('总查找次数：', count);
  return mid;
}

// console.log('getSquare(4)', getSquare(4))
// console.log('getSquare(4)', getSquare(9)) // 3.000000089406967 js 中会有精度的问题
console.log('getSquare(4)', getSquare(8 * Math.pow(10, 9)))
// 经过测试，查找 8亿多 的平方根，大概只查找了 68 次，效率还是很高的。