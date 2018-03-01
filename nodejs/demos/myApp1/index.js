const fs = require('fs');
const path = require('path');
const paths = '/Users/xueqi/Desktop/git/today/nodejs/demos/myApp1/text1.txt';

const fn = require('../myApp2/');
console.log(fn);
console.log(module);
console.log(module.exports);
console.log(exports);
console.log(exports === module.exports);
console.log(require);
console.log(__filename);
console.log(__dirname);



var zdlMdule = {
  exports: {
    name: 'zdl_s'
  }
}

console.log("-----------");

(function(zdlMdule, zexports) {

  console.log(zdlMdule);
  console.log(zexports);
  // zexports = {name: 'nming'}; 这样写外面的exports的值不会变， 
  zdlMdule.exports = {name: 'nming'}; // 这样写才会变
  console.log('zexports', zexports);

})(zdlMdule, zdlMdule.exports)

console.log('外面:', zdlMdule.exports);