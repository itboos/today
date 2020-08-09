 /**
  * desc: 二叉搜索树的创建和遍历： 先序， 中序，后序遍历。
  * 先序：根节点 -> 左节点 -> 右节点
  * 中序：左节点 -> 根节点-> 右节点
  * 后续：左节点 ->  右节点 -> 根节点
  * 可以看到，这种命名方式是已根节点的访问顺序来命名的。
  * 
  * date: 2020-04-07
  * 二次看的时间: 2020-07-18
  * @param {*} data 
  * @param {*} left 
  * @param {*} right 
  */
 // Node 类
 function Node(data, left, right) {
  this.data = data
  this.left = left;
  this.right = right;
  this.show = function() {
    console.log("-> " + this.data)
  }
}

// BST 类
function BST() {
  this.root = null;
  this.insert = insert;
}

function insert(data) {
  // 如果根节点为 null, 则将改节点设置为根节点。
  // 否则，需要遍历 BST ，找到节点的插入位置插入。
  if (this.root === null)  return this.root = new Node(data, null, null)
  var current = this.root
  while(true) {
    if (data < current.data) {
      if (current.left === null) {
        current.left = new Node(data, null, null)
        break;
      }
      current = current.left;
    } else {
     if (current.right === null) {
       current.right = new Node(data, null, null);
       break;
     }
     current = current.right;
    }
  }

}
// 中序遍历： 左 -> 根 -> 右 从小到大输出 二叉查找树的 键值
function inOrder(node) {
  if (node !== null) {
    inOrder(node.left)
    node.show();
    inOrder(node.right)
  }
}

// 先序遍历: 根 -> 左 -> 右
function preOrder(node) {
 if (node !== null) {
   node.show();
   preOrder(node.left);
   preOrder(node.right);
 }
}

// 后序遍历： 左 -> 右 -> 根
function postOrder(node) {
 if (node !== null) {
   postOrder(node.left)
   postOrder(node.right)
   node.show();
 }
}

var bsOne = new BST()
bsOne.insert(23)
bsOne.insert(16)
bsOne.insert(45)
bsOne.insert(3)
bsOne.insert(22)
bsOne.insert(37)
bsOne.insert(99)

/*
 树结构图:
     23
   /    \
  16    45
 /  \  /  \
3  22 37  99

*/
console.log('bsOne:', bsOne)
console.log('------------中序遍历-------------')
inOrder(bsOne.root); // 3 16 22 23 37 45 99 // 根左右
console.log('------------先序遍历-------------') // 左根右
preOrder(bsOne.root);// 23 16 3 22 45 37 99
console.log('----------后续遍历---------------')
postOrder(bsOne.root); // 3 22 16 37 99 45 23 // 左右根

// 二叉搜索树的查找

// 1. 查找最小值: 最小值肯定在最左侧
function getBSTMin(root) {
  var current = root
  while(current.left !== null) {
    current = current.left
  }
  return current.data
}

// 2. 查找最大值： 最大值肯定在最右侧

function getBSTMax(root) {
  var current = root
  while(current.right !== null) {
    current = current.right
  }
  return current.data
}

// 3. 查找指定值： 
function find (root, data) {
  var current = root
  while(current != null) {
    if (current.data === data) {
      return current
    } else if (current.data > data) {
      current = current.left
    } else {
      current = current.right
    }
  }
  return null
}

// 这两个方法返回最小值和最大值，但有时，我们希望方法返回存储最小值和最大值的节点。
// 这很好实现，只需要修改方法，让它返当前回节点，而不是节点中存储的数据即可。

// 测试
var min = getBSTMin(bsOne.root)
var max = getBSTMax(bsOne.root)
console.log('min, max:', min, max)
console.log(find(bsOne.root, 3))
console.log(find(bsOne.root, 99))


// 广度遍历
function BFS_Traverse(node) {
  var queue = []
  queue.push(node)
  while (queue.length > 0) {
    var node = queue.shift()
    // console.log('->', node.data)
    node.show();
    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
  }
  console.log('遍历完成')
}
console.log('-------------广度遍历------------')
BFS_Traverse(bsOne.root)

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
// 方法 1: 
// https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/bfs-de-shi-yong-chang-jing-zong-jie-ceng-xu-bian-l/
var levelOrder = function(root) {
  var queue = []
  var number = []
  if (!root) return number

  queue.push(root)
  while(queue.length > 0) {
    var currentLevelSize = queue.length
    var currentLevelArr = []
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

function rightSideView(root) {
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
    number.push(currentLevelArr)
  }
  // 右视图的节点跟节点肯定在里面
  // 从层次遍历的结果取出每一层的最右边那个节点（从第一层开始）
  var rightView = number.map(function(levelResult) {
    var len = levelResult.length
    return len > 1 ? levelResult[len - 1] : levelResult[0]
  })
  return rightView
}

var rightSideViewRes = rightSideView(bsOne.root)

console.log('二叉树的右视图a: ', rightSideViewRes)

/**
 * desc:  173. 二叉搜索树迭代器
 * https://leetcode-cn.com/problems/binary-search-tree-iterator/
 * 思路： 本质上属于先序遍历：
 * 先中序遍历得到从小到大顺序的数组，然后从左往右依次返回数组元素即可。
 */
function BSTIterator(root) {
  if (root === null) {
    this.dataArr = []
    return
  }
  this.dataArr = inOrderBSTIterator(root, [])
}
/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function() {
  return this.dataArr.shift()
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
  return this.dataArr.length > 0
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

function inOrderBSTIterator(node, resArr) {
  if (node!== null ) {
    inOrderBSTIterator(node.left, resArr)
    resArr.push(node.data)
    inOrderBSTIterator(node.right, resArr)
  }
  return resArr
}

var BSTIteratorObj = new BSTIterator(bsOne.root)
console.log('BSTIteratorRes hasNext-------------', BSTIteratorObj.next())
console.log('BSTIteratorRes-------------', BSTIteratorObj.hasNext())
console.log('BSTIteratorRes-------------', BSTIteratorObj.next())
console.log('BSTIteratorRes-------------', BSTIteratorObj.next())
console.log('BSTIteratorRes-------------', BSTIteratorObj.next())
console.log('BSTIteratorRes-------------', BSTIteratorObj.next())
console.log('BSTIteratorRes-------------', BSTIteratorObj.next())
console.log('BSTIteratorRes hasNext----------只剩最后一个元素了', BSTIteratorObj.hasNext())
console.log('BSTIteratorRes-------------', BSTIteratorObj.next())
console.log('BSTIteratorRes-------------', BSTIteratorObj.next())
console.log('BSTIteratorRes hasNext -------------', BSTIteratorObj.hasNext())
console.log('BSTIteratorRes-------------', BSTIteratorObj.next())

// 删除二叉搜索树的节点
// https://leetcode-cn.com/problems/delete-node-in-a-bst/solution/shan-chu-er-cha-sou-suo-shu-zhong-de-jie-dian-by-l/