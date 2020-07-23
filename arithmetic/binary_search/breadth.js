// 宽度优先算法

function BFS_Traverse(node) {
  var queue = []
  queue.push(node)
  while (queue.length > 0) {
    var node = queue.shift()
    console.log('->', node.data)
    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
  }
  console.log('遍历完成')
}

// 二叉树的层次遍历 参考资料：
// https://cloud.tencent.com/developer/article/1196253