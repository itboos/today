import { createSelector, createSelectorCreator } from 'reselect'

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { id: '001', name: '第1', price: 100 },
      { id: '002', name: '第2', price: 100 },
      { id: '003', name: '第3', price: 100 },
      { id: '004', name: '第4', price: 100 },
      { id: '005', name: '第5', price: 100 },
      { id: '006', name: '第6', price: 100 },
    ]
  }
}
let exampleState2 = {
  shop: {
    taxPercent: 8,
    items: [
      { id: '001', name: '第1', price: 100 },
      { id: '002', name: '第2', price: 100 },
      { id: '003', name: '第3', price: 100 },
      { id: '004', name: '第4', price: 100 },
      { id: '005', name: '第5', price: 100 },
      { id: '006', name: '第6', price: 100 },
    ]
  }
}

const cusTomMomorize = function(fn, a, b) {
  // 返回一个带有记录功能的函数
  const cacheMap = {};
  return function(...args) {
    const key = Array.prototype.join.call(args, '_')
    let result
    if (!cacheMap[key]) {
      result = fn.apply(null, args)
      cacheMap[key] = result
    } else {
      console.log('使用缓存结果：参数为', key)
    }
    console.log('cacheMap:', cacheMap)
    return cacheMap[key];
  }
}
// 使用自定义 Memorize 方法
const customSelector = createSelectorCreator(
  cusTomMomorize,
  '其它参数-1',
  '其它参数-2',
)

var getOneUserById = customSelector(
  state => state.shop.items,
  (_, userId) => userId,
  getByUserIdFunc
);

function getByUserIdFunc(users, userId) {
  const findedUsers = users.filter((user) => {
    return user.id === userId
  })
  return findedUsers[0]
}

// 调用选择器
// debugger;
var res1 = getOneUserById(exampleState, '001');
var res2 = getOneUserById(exampleState, '002');
var res3 = getOneUserById(exampleState, '001');
var res4 = getOneUserById(exampleState, '002');
var res5 = getOneUserById(exampleState, '003');
var res6 = getOneUserById(exampleState, '001');
console.log('res1,2,3', res1, res2, res3, res4, res5, res6);