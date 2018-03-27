// 判断一个数是不是质数  在大于1的整数中，只能被1和它自己整除的数叫素数 2 是质数， 1不是质数也不是合数
// module.exports =  function isShu(a) {
//   var count = 0;
//   if (typeof a !== 'number' || a <= 1) {
//     return false;
//   }
//   for (var i = 2; i < a; i++) {
//     if (a % i === 0) {
//       count++;
//     }
//     if (count >= 1) {
//       break;
//     }
//   }
//   if (count === 0) {
//      return true;
//   }
//   return false;
// }

/*
  数组扁平化: https://github.com/jonschlinkert/arr-flatten
*/ 

'use strict';
module.exports = function(arr) {
  // 这里是用了函数curry 化?
  return flat(arr, []);
}
function flat(arr, res) {
  var i = 0, cur;
  var len = arr.length;
  for (; i < len; i++) {
    cur = arr[i];
    Array.isArray(cur) ? flat(cur, res): res.push(cur);
  }
  return res;
}
// 调用: 
var flat = require('./index');
var arr1 = [4,5,[1,2,3], 0];
var res1 = flat(arr1);
console.log('res1:', res1);

// =============== end ==============
