// 循环队列 的实现
// MyCircularQueue(k): 构造器，设置队列长度为 k 。
// Front: 从队首获取元素。如果队列为空，返回 -1 。
// Rear: 获取队尾元素。如果队列为空，返回 -1 。
// enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
// deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
// isEmpty(): 检查循环队列是否为空。
// isFull(): 检查循环队列是否已满。

// MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
// circularQueue.enQueue(1);  // 返回 true
// circularQueue.enQueue(2);  // 返回 true
// circularQueue.enQueue(3);  // 返回 true
// circularQueue.enQueue(4);  // 返回 false，队列已满
// circularQueue.Rear();  // 返回 3
// circularQueue.isFull();  // 返回 true
// circularQueue.deQueue();  // 返回 true
// circularQueue.enQueue(4);  // 返回 true
// circularQueue.Rear();  // 返回 4

/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function(k) {
  this.data = new Array(k)
  this.head = -1
  this.tail = -1
  this.size = k
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
  if (this.isFull()) {
    return false
  }
  if (this.isEmpty()) {
    this.head = 0
  }
  this.tail = (this.tail + 1) % this.size
  this.data[this.tail] = value
  return true
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
  if (this.isEmpty()) {
    return false
  }
  if (this.head === this.tail) {
    this.head = -1
    this.tail = -1
    return true
  }
  this.head = (this.head + 1) % this.size
  return true
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
  if (this.isEmpty()) {
    return -1
  }
  return this.data[this.head]
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
  if (this.isEmpty()) {
    return -1
  }
  return this.data[this.tail]
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
  return this.head === - 1
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
  return ((this.tail + 1) % this.size) == this.head
};


var circularQueue = new MyCircularQueue(3); // 设置长度为 3
var res1 = circularQueue.enQueue(1);  // 返回 true
var res2 = circularQueue.enQueue(2);  // 返回 true
var res3 = circularQueue.enQueue(3);  // 返回 true
var res4 = circularQueue.enQueue(4);  // 返回 false，队列已满
var res5 = circularQueue.Rear();  // 返回 3
var res6 = circularQueue.isFull();  // 返回 true
var res7 = circularQueue.deQueue();  // 返回 true
var res8 = circularQueue.enQueue(4);  // 返回 true
var res9 = circularQueue.Rear();  // 返回 4

console.log('res1....9', res1, res2, res3, res4, res5)
console.log('res1....9', res6, res7, res8, res9)