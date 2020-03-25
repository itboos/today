// 桥接模式是软件设计模式中最复杂的模式之一，它把事物对象和其具体行为、具体特征分离开来，使它们可以各自独立的变化。事物对象仅是一个抽象的概念
// https://zh.wikipedia.org/wiki/%E6%A9%8B%E6%8E%A5%E6%A8%A1%E5%BC%8F

 class DrawingAPI1 {
  drawCircle(x, y, radius) {
    console.log(`API1.circle at ${x}, ${y}, ${radius}`)
  }
 }
 class DrawingAPI2 {
  drawCircle(x, y, radius) {
    console.log(`API2.circle at ${x}, ${y}, ${radius}`)
  }
 }

 /* "Refined Abstraction" */
 class CircleShape {
   constructor(x, y, radius, drawingAPI) {
      this.x = x
      this.y = y
      this.radius = radius
      this.drawingAPI = drawingAPI
   }
   // low-level i.e. Implementation specific
   draw() {
    this.drawingAPI.drawCircle(this.x, this.y, this.radius);
   }
   // high-level i.e. Abstraction specific
   resizeByPercentage(percent) {
     this.radius *= percent
   }
 }
 /* "Client" */
 class BridgePattern {
    constructor() {
      this.shapes = [
        new CircleShape(1, 2, 3, new DrawingAPI1()),
        new CircleShape(5, 7, 11, new DrawingAPI2())
      ]
    }
    display() {
      for(let i = 0, len = this.shapes.length; i < len; i++) {
        this.shapes[i].resizeByPercentage(2.5);
        this.shapes[i].draw();
      }
    }
 }
 const b = new BridgePattern()
 b.display();

 // API1.circle at 1, 2, 7.5
 // API2.circle at 5, 7, 27.5