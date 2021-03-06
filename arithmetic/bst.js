 /**
  * desc: 二叉搜索树的创建和遍历： 先序， 中序，后序遍历。
  * 先序：根节点 -> 左节点 -> 右节点
  * 中序：左节点 -> 根节点-> 右节点
  * 后续：左节点 ->  右节点 -> 根节点
  * 可以看到，这种命名方式是已根节点的访问顺序来命名的。
  * 
  * date: 2020-04-07
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
inOrder(bsOne.root);
console.log('-------------------------')
preOrder(bsOne.root);
console.log('-------------------------')
postOrder(bsOne.root);

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

// 测试
var min = getBSTMin(bsOne.root)
var max = getBSTMax(bsOne.root)
console.log('min, max:', min, max)
console.log(find(bsOne.root, 3))
console.log(find(bsOne.root, 99))
