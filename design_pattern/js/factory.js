// 简单工厂:  es5 的 new 和构造器的相关说明, 模拟 new 的行为
function A(name) {
  this.name = name;
}
function ObjectFactory() {
  var obj = {},
      Constructor = Array.prototype.shift.call(arguments); // 取出 arguments 的第一个参数。
  obj.__proto__ = typeof Constructor.prototype === 'number' ? 
                        Object.prototype :
                        Constructor.prototype;
  // console.log('Constructor.prototype:', Constructor.prototype, A.prototype)
  var ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}

var a = ObjectFactory(A, 'zack');
console.log(a.name, a)