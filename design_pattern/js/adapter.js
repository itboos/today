 // 适配器模式: https://zh.wikipedia.org/wiki/%E9%80%82%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8F
 // 适配器模式（英语：adapter pattern）有时候也称包装样式或者包装(wrapper)。将一个类的接口转接成用户所期待的。一个适配使得因接口不兼容而不能在一起工作的类能在一起工作，做法是将类自己的接口包裹在一个已存在的类中。
 class Line {
  constructor() {}
  draw(x1, y1, x2, y2) {
    console.log("Line from point A(" + x1 + ";" + y1 + "), to point B(" + x2 + ";" + y2 + ")");
  }
}

class Rectangle {
  constructor() {}
  draw(x, y, width, height) {
    console.log("Rectangle with coordinate left-down point (" + x + ";" + y + "), width: " + width
              + ", height: " + height);
  }
}

class LineAdapter {
  constructor(line) {
    this.adapter = line
  }
  draw(x1, y1, x2, y2) {
    this.adapter.draw()
  }
}

class RectangleAdapter {
  constructor(rec) {
    this.adapter = rec
  }
  draw(x1, y1, x2, y2) {
    const x = Math.min(x1, x2),
        y = Math.min(y1, y2);
    const width = Math.abs(x2 - x1)
    const height = Math.abs(y2 - y1);
    this.adapter.draw(x, y, width, height)
  }
}

var shapes = [new LineAdapter(new Line()), new RectangleAdapter(new Rectangle())]
var x1 = 10,
    y1 = 20,
    x2 = 30,
    y2 = 60;
// 打印 信息
for (let i = 0; i < shapes.length; i++) {
  shapes[i].draw(x1, y1, x2, y2);
}