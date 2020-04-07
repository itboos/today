/**
 * desc: 设配器 2
 * @param {*} arr 
 */
// var  p1 = {
//   head: () {},
//   last: () {},
//   getLength() {},
//   getIndex() {},
// }

function arrAdapter(arr) {
  return {
    head: function() {
      return arr[0]
    },
    last: function() {
      return arr[arr.length - 1]
    },
    getLength: function() {
      return arr.length
    },
    get: function(index) {
      return arr[index]
    }
  }
}
var arr = [1,2,3,4,5,6,7,8]
var nA = arrAdapter(arr)
console.log(nA.head())
console.log(nA.last())
console.log(nA.getLength())
console.log(nA.get(3))