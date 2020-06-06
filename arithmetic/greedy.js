/* 贪心算法 */
var minCount = Number.MAX_SAFE_INTEGER
console.log('minCount:', minCount)
var resultArr = []
var bestResult = []
function getMinCount(coins, amount) {
  for (var i = 0; i < coins.length; i++) {
    cal(coins, coins[i], amount, [])
  }
  return minCount == Number.MAX_SAFE_INTEGER ? -1 : minCount;
}

function cal(coins, coin, amount, curCoins) {
  // console.log('coins, coin, amount, curCoins:', coins, coin, amount, curCoins)
  // 得到新的剩余金额
  var leftAmount = amount - coin;
  // 如果 剩余金额等于 0， 表示找到一组解
  if (leftAmount === 0) {
    curCoins.push(coin)
    // 存下此组解
    resultArr.push(curCoins)
    if(curCoins.length < minCount) {
      minCount = curCoins.length
      bestResult = [...curCoins]
      console.log('更优解：', bestResult, minCount)
    }
    return
  } 
  // 剩余金额大于 0 ， 继续下一次
  if (leftAmount > 0) {
    // 如果当前组的总硬币数量已经大于当前最小组合的硬币数量，就不需要在往下找了
    // 优化点
    // if (curCoins.length >= minCount){
    //   console.log('优化点。。。')
    //   return;
    // }
    var newCoins = []
    // newCoins.concat(curCoins, coin)
    newCoins = [...curCoins, coin]
    // debugger;
    for (var j = 0; j < coins.length; j++) {
      cal(coins, coins[j], leftAmount, newCoins)
    }
  }
}

var res1 = getMinCount([1, 2, 5], 11);
minCount = Number.MAX_SAFE_INTEGER
var res2 = getMinCount([2], 3);

console.log('res1, res2:', res1, res2)
console.log('resultArr:', resultArr)
console.log('bestResult:', bestResult)