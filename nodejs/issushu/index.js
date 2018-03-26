// 判断一个数是不是质数  在大于1的整数中，只能被1和它自己整除的数叫素数 2 是质数， 1不是质数也不是合数
module.exports =  function isShu(a) {
  var count = 0;
  if (typeof a !== 'number' || a <= 1) {
    return false;
  }
  for (var i = 2; i < a; i++) {
    if (a % i === 0) {
      count++;
    }
    if (count >= 1) {
      break;
    }
  }
  if (count === 0) {
     return true;
  }
  return false;
}