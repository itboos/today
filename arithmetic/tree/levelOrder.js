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

// var resLevelOrder = levelOrder(bsOne.root)
// console.log('层次遍历，输出二维数组1：', resLevelOrder)


/*
* desc: 层次遍历方法2： 递归方法
* https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/die-dai-di-gui-duo-tu-yan-shi-102er-cha-shu-de-cen/
* 通用模板： https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/tao-mo-ban-bfs-he-dfs-du-ke-yi-jie-jue-by-fuxuemin/
*/
function levelOrder2(root) {
  var number = [[]]
  myPreOrder(root, 0, number)
  return number
}

function myPreOrder(node, depth, number) {
  if (!node) return
  // number 是[ [1],[2,3] ]， depth 是 3，就再插入一个空 list 放到 number中
  if (depth >= number.length ) {
    number.push([])
  }
  number[depth].push(node.data)
  myPreOrder(node.left, depth + 1, number)
  myPreOrder(node.right, depth + 1, number)
}
// var myPreOrderRes = levelOrder2(bsOne.root)

// console.log('层次遍历，输出二维数组2：', myPreOrderRes)

// 二叉树的层次遍历的相关变种：
// 103. 二叉树的锯齿形层次遍历
// https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/
function zigzagLevelOrder(root) {
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
      // TODO leetcode 里的值 是 val 形式的， 提交的时候要 改成 node.val
      currentLevelArr.push(node.data)
      if (node.left !== null) {
        queue.push(node.left)
      }
      if (node.right !== null) {
        queue.push(node.right)
      }
    }
    // 将一层的数据添加到 结果数组里
    currentLevelArr = number.length % 2 === 0 ? currentLevelArr : currentLevelArr.reverse()
    number.push(currentLevelArr)
  }
  return number
}

var zigzagLevelOrderRes = zigzagLevelOrder(bsOne.root)

console.log('二叉树的锯齿形层次遍历3: ', zigzagLevelOrderRes)

// 199.二叉树的右视图
// https://leetcode-cn.com/problems/binary-tree-right-side-view/

function rightSideView(root) {
  var queue = []
  var number = []
  if (!root) return number

  queue.push(root)
  while(queue.length > 0) {
    var currentLevelSize = queue.length
    // 循环 currentLevelSize 次的目的是 每次都把 一层的节点遍历完， 以便得到某一层结果。
    for (var i = 0; i < currentLevelSize; i++) {
      var node = queue.shift()
      // TODO leetcode 里的值 是 val 形式的， 提交的时候要 改成 node.val
      number.push(node.data)
      // 只添加右节点
      if (node.right !== null) {
        queue.push(node.right)
      }
    }
  }
  return number
}

var rightSideViewRes = rightSideView(bsOne.root)

console.log('二叉树的右视图: ', rightSideViewRes)