// 牛客网输入输出：
//  牛客网输出函数用 print()和 console.log() 都可
// 参考： https://blog.csdn.net/ZF15261890967/article/details/72821674

// 1. 读取 1 行
var readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.on('line', function(line) {
  var tokens = line.split(' ')
  console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
})

// 2. 读取指定行输入 num 为指定行
var readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var countLine = 1
var tokens = []
rl.on('line', function(line) {
  tokens.push(line)
  if(countLine === num) {
    //操作部分
    countLine = 1
    tokens = []
  } else {
    countLine++
  }
})

// 3. 读取多行
process.stdin.resume();
process.stdin.setEncoding('ascii');

var input = "";
var input_array = "";

process.stdin.on('data', function (data) {
    input += data;
});

process.stdin.on('end', function () {
    input_array = input.split("\n");
    // 处理input
});

// 固定行数输入：
var readline = require('readline')
// 得到行数
var lineNum = parseInt(readline())
var lines = []
for (var i = 0; i < lineNum; i++) {
  var line = readline()
  lines.push(line)
}
console.log(lines)

// 任意行数输入：
while(lines = readline()) {
  // 利用 while 循环，只有还有行数在，就会获取输入输出
  // 获取到的字符串会放在数组中
}
/**
 * eg: 输入： asd
 *           qwe
 *          zxc
 * 会得到字符串数组： ['asd', 'qwe', 'zxc']
 */

// 明明的随机数：
var readline = require('readline')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var tokens = []
var lineNum = 0
var currentLineCount = 0

rl.on('line', function(line) {
  var num = parseInt(line)
  currentLineCount = currentLineCount + 1;
  console.log(num, currentLineCount)
  console.log('1', currentLineCount === 1);
  if (currentLineCount === 1) {
      lineNum = num
      console.log('here', lineNum)
  } else {
     tokens.push(num)
  }
  if (currentLineCount === lineNum + 1) {
    // 当输入行数等于 给定行数时，进行处理   
    // 去重后排序
    var arr = Array.from(new Set(tokens))
    arr = arr.sort();
    arr.forEach(function(num) {
      console.log(num);
    })
    // 处理完成后， currentLineCount 重置为 0， 一遍下轮测试
    currentLineCount = 0
    tokens = []
    lineNum = 0
  }
})