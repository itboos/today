// MyCircularQueue(k): 构造器，设置队列长度为 k 。
// Front: 从队首获取元素。如果队列为空，返回 -1 。
// Rear: 获取队尾元素。如果队列为空，返回 -1 。
// enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
// deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
// isEmpty(): 检查循环队列是否为空。
// isFull(): 检查循环队列是否已满。

/**
 * desc: 循环队列 Class 版实现
 */
class CircleQueue {
  constructor(k) {
    this._data = new Array(k)
    this.size = k
    this.head = -1
    this.trail = -1
  }
  Front() {
    return this.isEmpty() ? -1 : this._data[this.head]
  }
  Rear() {
    return this.isEmpty() ? -1 : this._data[this.trail]
  }
  isEmpty() {
    return this.head === - 1
  }
  isFull() {
    // 队列满了的判断
    return this.head ===  (this.trail + 1) % this.size
  }
  // 插入一个值
  enQueue(value) {
    if (this.isFull()) return false
    if (this.isEmpty() == true) {
      this.head = 0;
    }
    // 更新尾指针
    this.trail = (this.trail + 1) % this.size
    this._data[this.trail] =  value
    return true
  }
  deQueue() {
    if (this.isEmpty()) return false
    // 当首尾指针重合时，表示队列只有一个元素了
    if (this.head === this.trail) {
      this.head = -1
      this.trail = -1
      return true
    }
    // 更新头指针
    this.head = (this.head + 1) % this.size
    return true
  }
}

var circularQueue = new CircleQueue(3); // 设置长度为 3
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