// 1.给出两个整数a和b, 求他们的和, 但不能使用 + 等数学运算符。 
/* 1.1 return a-(-b)
   1.2 通过位运算:
   https://my.oschina.net/u/2462998/blog/663534
   function addTwo(a, b) {
     var sum = 0;
     var carry = 0;
     do {
       sum = a ^ b;
       carry = (a & b) << 1;
       a = sum;
       b = carry;
     } while(carry !== 0);
     return sum;
   }
*/ 

// 2. 不通过第三方变量，交换两个数字变量
/*
   2.1 通过异或操作
   function swipeTwo(a, b) {
     a = a ^ b;
     b = b ^ a;
     a = a ^ b;
   }
*/

// 3. 设计一个算法，计算出n阶乘中尾部零的个数
// https://blog.csdn.net/kkdd2013/article/details/51880672
/*
   functonTrailingZeros(n) {
      var  sum = 0;
      while (n != 0) {
          sum += n / 5;
          n /= 5;
      }
      return sum;
   }
   本题是求n! 的十进制形式的末尾 0 的个数（n /= 5），类似还有求2进制形式的末尾0的个数，3进制形式末尾0的个数。二进制就是 n /=2 ，三进制就是 n /= 3。
*/


// 冒泡排序: 将第一个数和后面的一个数相比， 若更大/(更小)，则交换，每一趟下来， 得到一个最大数， 每一轮比较的次数减一 
// 优化， 
var arrs = [10, 1, 3, 2, 6], temp = 0;
for (var i = 0, len = arrs.length; i < len; i++) {
    for (j = 0; j < len-i; j++) {
        if (arrs[j] > arrs[j+1]) {
            temp = arrs[j];
            arrs[j] = arrs[j+1];
            arrs[j+1] = temp;
        }
    }
}
console.log(arrs);
//黑科技:
简单的实现一个兼容性较好的深拷贝对象的方案:
var soucreObj = {
    a: '测试文字',
    f: ['zdl', 'xueqi', 'cwy'],
};
var newObj = JSON.parse(JSON.stringify(soucreObj));
console.log(newObj.f === soucreObj.f); // false  因为是深拷贝， 所有新对象拥有一份完全新的数据
// 这里的原理就是利用了JSON.parse 会生成一个全新的对象


