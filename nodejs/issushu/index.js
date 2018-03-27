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

// =============== end ==============
