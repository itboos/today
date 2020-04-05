/**
 * desc: 二分查找的变形操作
 */

// 1. 查找第一个等于给定值的元素（前提： 数组里的元素是有序的，可能存在重复数据）

function binarySearch_t1(arr, value) {
  var low = 0,
      high = arr.length - 1
      mid = 0
  // 注意 循环结束条件（左右指针重合时 low <= high ）
  while(low <= high) {
    mid = Math.floor((low + high) / 2);
    // 当存在重复元素时， 目标值等于 查找时时，还需再判断是不是第一个 目标值
    if (arr[mid] === value) {
      // 当 mid = 0 时，说明数组只有一个元素，此时，必然是第一个目标值。
      // 再判断 arr[mid] 的前一个值 是否等于目标值，如果是，则需要继续往前查找。否则，次值就是第一个等于目标值的数。
      if (mid === 0 || arr[mid - 1] !== value) return mid
      // 否则，继续查找
      high = mid - 1
    }
    // high 左移
    if (arr[mid] > value) {
      high = mid - 1;
    }
    // low 右移
    if (arr[mid] < value) {
      low = mid + 1;
    }
  }
  return -1;
}

// 2. 查找最后一个等于给定值的元素
function binarySearch_t2(arr, value) {
  var low = 0,
      high = arr.length - 1
      mid = 0
  // 注意 循环结束条件（左右指针重合时 low <= high ）
  while(low <= high) {
    mid = Math.floor((low + high) / 2);
    // 当存在重复元素时， 目标值等于 查找时时，还需再判断是不是第一个 目标值
    if (arr[mid] === value) {
      // 当 mid = 0 时，说明数组只有一个元素，此时，必然是第一个目标值。
      // 再判断 arr[mid] 的后一个值 是否等于目标值，如果是，则需要继续往后查找。否则，次值就是第一个等于目标值的数。
      if (mid === 0 || arr[mid + 1] !== value) return mid
      // 否则，继续往后查找
      low = mid + 1
    }
    // high 左移
    if (arr[mid] > value) {
      high = mid - 1;
    }
    // low 右移
    if (arr[mid] < value) {
      low = mid + 1;
    }
  }
  return -1;
}

// 3. 查找第一个大于等于给定值的元素
function binarySearch_t3(arr, value) {
  var low = 0,
      high = arr.length - 1
      mid = 0
  while(low <= high) {
    mid = Math.floor((low + high) / 2);
    if (arr[mid] >= value) {
      if (mid === 0 || arr[mid - 1] < value) return mid
      // 否则，继续往后查找
      high = mid - 1
    }
    // high 左移
    if (arr[mid] > value) {
      high = mid - 1;
    }
    // low 右移
    if (arr[mid] < value) {
      low = mid + 1;
    }
  }
  return -1;
}
// 4. 查找最后一个小于等于给定值的元素
function binarySearch_t4(arr, value) {
  var low = 0,
      high = arr.length - 1
      mid = 0
  while(low <= high) {
    mid = Math.floor((low + high) / 2);
    if (arr[mid] <= value) {
      // 后一个值比前一个值大，则说明无需再找了。
      if (mid === 0 || arr[mid + 1] > value) return mid
      // 否则，继续往后查找
      low = mid + 1
    }
    // high 左移
    if (arr[mid] > value) {
      high = mid - 1;
    }
    // low 右移
    if (arr[mid] < value) {
      low = mid + 1;
    }
  }
  return -1;
}

var arr = [0,1,2,3,4,5,6,7,7,7,7,8,9,10, 11]
console.log(binarySearch_t1(arr, 7)); // 7
console.log(binarySearch_t2(arr, 7)); // 10
console.log(binarySearch_t3(arr, 7)); // 7
console.log(binarySearch_t4(arr, 7)); // 10 最后一个  7 的索引
