# 二叉树相关内容.

### 二叉树的遍历

如何遍历一颗树 ？

有两种通用的遍历树的策略：

- 深度优先搜索（DFS）Depth First Search

采用深度作为优先级，以便从根开始一直到达某个确定的叶子，然后再返回根到达另一个分支。

深度优先搜索策略又可以根据根节点、左孩子和右孩子的相对顺序被细分为```先序遍历```，```中序遍历```和```后序遍历```。

- 广度优先搜索（BFS）Breadth First Search

我们按照高度顺序一层一层的访问整棵树，高层次的节点将会比低层次的节点先被访问到

- [二叉树的层次遍历](./levelOrder.js)

### 笔记：
-[BFS 的使用场景总结：层序遍历、最短路径问题](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/bfs-de-shi-yong-chang-jing-zong-jie-ceng-xu-bian-l/)

### 题目勾选：
- 102. 二叉树的层次遍历
- 103. 二叉树的锯齿形层次遍历