// 单例模式， 也称为单子模式:  属于创建型模式的一种。在应用这个模式时，单例对象的类必须保证只有一个实例存在
  // https://zh.wikipedia.org/wiki/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F
  var a  = 1
  function A() {
    a ++;
    return {
      name: '单例A',
      count: a
    }
  }
  function B() {
    a ++;
    return {
      name: '单例B',
      count: a
    }
  }
  // PS: 函数运行结果缓存也是类似的思路
  function singleton(fn) {
    var result;
    return function() {
      return result || (result = fn.apply(this, arguments))
    }
  }
  
  var createSingle = singleton(A)
  var obj1 = createSingle()
  var obj2 = createSingle()

  console.log('ob1 === obj2', obj1 === obj2, obj1);

  var createSingleTwo = singleton(B);
  var obj3 = createSingleTwo();
  var obj4 = createSingleTwo();
  console.log('obj3 === obj4', obj3 === obj4, obj3)

  var obj5 = createSingle()
  console.log('obj5 === obj1', obj5 === obj1, obj5);