/**
 * 并归排序: 
 *  该算法采用经典的分治（divide-and-conquer）策略（分治法将问题分(divide)成一些小的问题然后递归求解，
 *    而治(conquer)的阶段则将分的阶段得到的各答案"修补"在一起，即分而治之)。
 * 
 *  最好情况时间复杂度：O(nlogn) 并归排序每次排序的时间复杂度都是相同的，与原数组是否有序无关。
 * 
 *  最坏情况时间复杂度： O(nlogn)
 * 
 *  平均情况复杂度就是 O(nlogn)
 * 
 *  空间复杂度： O(n) 可以在一开始的时候（递归开始前）就创建 一个 大小 和原数组一样的的 tmp 数组，
 *   这样就能避免在 递归的时候避免重复创建数组的开销了。
 * 
 *  稳定性： 是稳定的算法
 *  是否是原地排序算法： 不是，主要 是因为合并函数无法在原地执行。
 */
// 时间复杂度的推导过程：

// 在递归那一节我们讲过，递归的适用场景是，一个问题a可以分解为多个子问题b、c，那求解问题a就可以分解为求解问题b、c。问题b、c解决之后，我们再 把b、c的结果合并成a的结果。
// 如果我们定义求解问题a的时间是T(a)，求解问题b、c的时间分别是T(b)和 T( c)，那我们就可以得到这样的递推关系式: T(a) = T(b) + T(c) + K
// 其中K等于将两个子问题b、c的结果合并成问题a的结果所消耗的时间。 从刚刚的分析，我们可以得到一个重要的结论:不仅递归求解的问题可以写成递推公式，递归代码的时间复杂度也可以写成递推公式。
//    套用这个公式，我们来分析一下归并排序的时间复杂度。 我们假设对n个元素进行归并排序需要的时间是T(n)，那分解成两个子数组排序的时间都是T(n/2)。我们知道，merge()函数合并两个有序子数组的时间复杂度
// 是O(n)。所以，套用前面的公式，归并排序的时间复杂度的计算公式就是: T(1) = C; n=1时，只需要常量级的执行时间，所以表示为C。
// T(n) = 2*T(n/2) + n; n>1 通过这个公式，如何来求解T(n)呢?还不够直观?那我们再进一步分解一下计算过程。
// T(n) = 2*T(n/2) + n
// = 2*(2*T(n/4) + n/2) + n = 4*T(n/4) + 2*n
// = 4*(2*T(n/8) + n/4) + 2*n = 8*T(n/8) + 3*n
// = 8*(2*T(n/16) + n/8) + 3*n = 16*T(n/16) + 4*n ......
// = 2^k * T(n/2^k) + k * n
// 
// ......
// 通过这样一步一步分解推导，我们可以得到T(n) = 2^kT(n/2^k)+kn。
// 当T(n/2^k)=T(1)时，也就是n/2^k=1，我们得到k=log2n 。我们将k值代入上面的公式，得
// 到T(n)=Cn+nlog2n 。如果我们用大O标记法来表示的话，T(n)就等于O(nlogn)。
// 所以归并排序的时间复杂度是O(nlogn)。

// 参考： https://www.cnblogs.com/chengxiao/p/6194356.html

function mergeSort(arr) {
  // 提前申明一个和原数组大小相同的 数组 n, 避免递归过程中频繁创建数组
  var tmp = new Array(arr.length);
  mergeSortCall(arr, 0, arr.length - 1, tmp);
  console.log('排序后 arr 为：', arr)
}

function mergeSortCall(arr, left, right, tmp) {
  // 当 left >= right 时，表示不再需要分解
  if (left >= right) return

  var mid = Math.floor((left + right) / 2);
  mergeSortCall(arr, 0, mid, tmp) // 左边并归排序
  mergeSortCall(arr, mid + 1, right, tmp) // 右边并归排序
  merge(arr, left, mid, right, tmp) // 将两个有序子数组合并
}

function merge(arr, left, mid, right, tmp) {
  var i = left // 左序列指针
  var j = mid + 1 // 右序列指针
  var t = 0 // 临时指针（梢头兵指针）

  while(i <= mid && j <= right) {
    if(arr[i] <= arr[j]){
      tmp[t++] = arr[i++]
    } else {
      tmp[t++] = arr[j++]
    }
  }
  // 将左边剩余的元素添加到 tmp 数组中(如果有剩余的话)
  while(i <= mid) {
    tmp[t++] = arr[i++]
  }
  // 将右边剩余的元素添加到 tmp 数组中(如果有剩余的话)
  while(j <= right) {
    tmp[t++] = arr[j++]
  }

  t = 0

  // 将 tmp 数组 copy 到 arr 数组中
  while(left <= right) {
    arr[left++] = tmp[t++]
  }
}
// int []arr = {9,8,7,6,5,4,3,2,1};
mergeSort([9,8,7,6,5,4,3,2,1]); // 排序后 arr 为： (9) [1, 2, 3, 4, 5, 6, 7, 8, 9]