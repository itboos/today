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