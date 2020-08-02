// 二叉树节点类见 ./binary_search_tree.js
// 层次遍历，输出 二维数组：
/**
 * [
    [23],
    [16, 25],
    [3, 22, 37, 99]
   ]
  * 时间复杂度： O(n)
  * 空间复杂度： O(n)
 */
// 方法 1: 比较好理解
// https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/bfs-de-shi-yong-chang-jing-zong-jie-ceng-xu-bian-l/
var levelOrder = function(root) {
  var queue = []
  var number = []
  if (!root) return number

  queue.push(root)
  while(queue.length > 0) {
    var currentLevelSize = queue.length
    var currentLevelArr = []
    // 循环 currentLevelSize 次的目的是 每次都把 一层的节点遍历完， 以便得到某一层结果。
    for (var i = 0; i < currentLevelSize; i++) {
      var node = queue.shift()
      currentLevelArr.push(node.data)
      if (node.left !== null) {
        queue.push(node.left)
      }
      if (node.right !== null) {
        queue.push(node.right)
      }
    }
    // 将一层的数据添加到 结果数组里
    number.push(currentLevelArr)
  }
  return number
};

var resLevelOrder = levelOrder(bsOne.root)
console.log('层次遍历，输出二维数组1：', resLevelOrder)


/*
* desc: 层次遍历方法2：
*/
function levelOrder2(root) {
  var number = [[]]
  myPreOrder(root, 0, number)
  return number
}

function myPreOrder(node, depth, number) {
  if (!node) return
  if (depth >= number.length ) {
    number.push([])
  }
  number[depth].push(node.data)
  myPreOrder(node.left, depth + 1, number)
  myPreOrder(node.right, depth + 1, number)
}
var myPreOrderRes = levelOrder2(bsOne.root)

console.log('层次遍历，输出二维数组2：', myPreOrderRes)