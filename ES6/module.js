// 模块加载笔记

// modulea.js
var fname = 'zdl';
var lastname = '雪奇';
var year = 2018;
var job = 'web'
var getSum = function(a, b) {
  return a + b;
};

export {fname, lastname, year}; // 是 export { fname: fname, lastname: lastname, year: year }; 形式的缩写
// export default命令用于指定模块的默认输出。
export default {
  test: 1,
  sex: 'man'
};
// 这样写也可以

// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// ************************


export { job, getSum }
export { job as zdlJob } // 通过as, 将job 变量重命名为 zdlJob 改名后再输出
// 一个文件块中只能有一个export default , 可以有多个 export *** 
// 这样导出的其实是一个对象，包含了导出的这些变量, 可以导出变量，方法，类


// 注意1: 另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);


// 注意2: export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。
/** 错误的写法
 * 
 *  function foo() {
      export default 'bar' // SyntaxError
    }
    foo()
*/



// ---------------------------------- ----------------------------------



// 导入
// 1. 模块的整体加载, 即用星号（*）指定一个对象，所有输出值都加载在这个对象上面
import * as moduleName from 'modulea.js' 
// 使用对象的解构赋值，导出部分变量(导出fname, lastname， 并且 将 lastname 重新命名为 lastName)
import { fname, lastname as lastName } from 'modulea.js'
// 3. 导入默认的变量，default (可能是变量，方法， 和类， 看谁跟在export default 后面了)
import defaultVa from 'modulea.js'  // 导出default 变量，并且命名为 defaultVa

// 注意1 脚本加载了变量fname，对其重新赋值就会报错，因为fname是一个只读的接口。但是，
// 如果a是一个对象，改写a的属性是允许的。 这种写法很难查错，建议凡是输入的变量，都当作完全只读，轻易不要改变它的属性。
// fname = 'sss' 报错

// 4. import语句会执行所加载的模块，因此可以有下面的写法
import 'lodash';
// 上面代码仅仅执行lodash模块，但是不输入任何值。
// 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
