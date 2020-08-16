// 牛客网在线输入输出联系题：
// https://ac.nowcoder.com/acm/contest/5647

// 1. 当行计算 a + b
// https://ac.nowcoder.com/acm/contest/5647/A
var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', function(line) {
  var tokens = line.split(' ')
  console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
})

// 2. 多行计算 a + b
// https://ac.nowcoder.com/acm/contest/5647/B

var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var num = 0
var results = []
rl.on('line', function(line) {
  if (countLine === 1) {
      num = parseInt(line)
  } else {
      // 输出结果数组
      tokens = line.split(' ');
      console.log((parseInt(tokens[0]) + parseInt(tokens[1])))
      results.push((parseInt(tokens[0]) + parseInt(tokens[1])))
  }
  countLine++
})

// 3. 多行输入，计算 a+b ，指定结束输入条件
/**
 * 链接：https://ac.nowcoder.com/acm/contest/5647/C
 * 输入包括两个正整数a,b(1 <= a, b <= 10^9),输入数据有多组, 如果输入为 0 0则结束输入
 * 输出描述:
 *   输出a+b的结果
 */

var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var tokens = []
var results = []
rl.on('line', function(line) {
   // 输出结果数组
  tokens = line.split(' ');
  var a = parseInt(tokens[0]);
  var b = parseInt(tokens[1]);
  if (a !== 0 && b !== 0) {
    console.log(a+b)
    results.push(a+b)   
  }
})


// 4. 多行输入，计算一系列的和
/**
 * desc: 计算一系列数的和
 * 链接：https://ac.nowcoder.com/acm/contest/5647/D
 * 来源：牛客网
 * 输入数据包括多组。
 * 每组数据一行,每行的第一个整数为整数的个数 n(1 <= n <= 100), n 为 0 的时候结束输入。
 * 接下来 n 个正整数,即需要求和的每个正整数。
 */
var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var tokens = []
var results = []
var lineNum = 0
var total = 0
rl.on('line', function(line) {
   // 输出结果数组
  tokens = line.split(' ');
  tokens = tokens.map(function(numStr) {
     return parseInt(numStr)
   })
  lineNum = tokens.splice(0, 1)[0];
  if (lineNum !== 0) {
     total = tokens.reduce(function(acc, num) {
        return acc + num
     }, 0)
   console.log(total)
   results.push(total)   
  }
})

// 5. 多行输入，计算一系列的和
/**
 * desc: 
 * 链接：https://ac.nowcoder.com/acm/contest/5647/E
  输入的第一行包括一个正整数t(1 <= t <= 100), 表示数据组数。
  接下来t行, 每行一组数据。
  每行的第一个整数为整数的个数n(1 <= n <= 100)。
  接下来n个正整数, 即需要求和的每个正整数。
 */
var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var lineNum = 0
var results = []
var total = 0

rl.on('line', function(line) {
  tokens = line.split(' ');
  tokens = tokens.map(function(numStr) {
     return parseInt(numStr)
   })
  lineNum = tokens.splice(0, 1)[0];
  if (countLine !== 1) {
    total = tokens.reduce(function(acc, num) {
      return acc + num
    }, 0)
    console.log(total)
    results.push(total)   
   }
  countLine++
})


var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var tokens = []
var results = []
var total = 0

rl.on('line', function(line) {
  tokens = line.split(' ');
  tokens = tokens.map(function(numStr) {
     return parseInt(numStr)
   })
   total = tokens.reduce(function(acc, num) {
      return acc + num
    }, 0)
    console.log(total)
    results.push(total)   
})


// 6. 多行输入，字符串排序

/** 
 * https://ac.nowcoder.com/acm/contest/5647/H
 * 输入有两行，第一行n
 * 第二行是n个空格隔开的字符串
 * 输出描述：
 * 输出一行排序后的字符串，空格隔开，无结尾空格
 */
var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
var lineNum = 0
var results = []

rl.on('line', function(line) {
  tokens = line.split(' ');
  if (countLine !== 1) {
    var resStr = tokens.sort().join(' ')
    console.log(resStr)
    results.push(resStr)
  }
  countLine++
})


// 试题解答: javascript 版
// https://blog.csdn.net/qq_25073545/article/details/80489694

// 字符串最后一个单词的长度
/**
 * desc: 计算字符串最后一个单词的长度，单词以空格隔开。
 * 输入描述： 一行字符串，非空，长度小于5000。
 * 输出描述： 整数N，最后一个单词的长度。
 * 输入： hello world 输出： 5
 */
var readline=require("readline");
const r1=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
r1.on('line',function(line){
  //找到数组中最后一个空格
  var lastSpacebar = line.lastIndexOf(" ");
  //用splice获取最后一个字符串
  var lastWord = line.slice(lastSpacebar+1);
  console.log(lastWord.length);
 })

 // 计算字符个数：
//  https://www.nowcoder.com/practice/a35ce98431874e3a820dbe4b2d0508b


//多行输入
/**
 * desc: 写出一个程序，接受一个由字母和数字组成的字符串，和一个字符，然后输出输入字符串中含有该字符的个数。不区分大小写。
 * https://www.nowcoder.com/practice/a35ce98431874e3a820dbe4b2d0508b1
 */
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const lines = [];
const charMap = {}
rl.on("line", function(line) {
    //将输入放到新建的空数组中
    lines.push(line);
    //判断，如果输入的行数等于某一值时
    if (lines.length === 2){
        //通过数组索引分别得到数组中每一行的数据，并做相应操作
        const str = lines[0].toLocaleUpperCase()
        const char = lines[1].toLocaleUpperCase().trim();
        for (let i = 0; i < str.length; i++) {
            let nc = str[i];
            if (!charMap[nc]) {
                charMap[nc] = 1
            } else {
                charMap[nc] +=1
            }
        }
        console.log(charMap[char] || 0);
    }
})