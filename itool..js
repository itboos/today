// 2017年08月12日15:12:05  开始写一些种子方法
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/** 
  * 对象混合方法
  * 混和多个对象， 将多个源对象的值合并到目标对象，支持是否复写同名属性，虽然有返回值，但是就是直接改变的target 对象，可以不接收返回值
  * @param {Object} target 目标对象，
  * @param {Object} soucre,要复制属性源对象 source1，source2.....至少一个
  * @param {boolean}isReWrite 是否覆盖原有属性（可选，默认为否）
  * @returns {boolean} 要改变的那个target 目标对象
  */
  function mix(target,source,isReWrite) {
    var args = [].slice.call(arguments),
        isReWrite = typeof args[args.length-1] === 'boolean' ? args.pop() : false,
        key = '';
        i= 1;
    //遍历元对象数组，依次混合
    while((source = args[i++])) {
      // 如果是重写属性，直接复制，否则，如果目标对象不存在的属性，才赋值，args[1000] =undefined
      for(var p in source) {
        if(isReWrite || !target.hasOwnProperty(p)) {
          target[p] = source[p];
        }
      }
    }
    return target;
  }
  // 调用列子： mix( target,obj1[,obj2,.....objn,true] )