import { createStore } from 'redux'
import rootReducer from './reducer'
// action 常量
import { fetchData } from './action';

//注入根reducer，创建store
const store = createStore(rootReducer);

console.log('store:', store)

// 订阅state 更新后的回调函数-1
store.subscribe(function() {
  console.log('监听函数-1:', store.getState());
});

// 订阅state 更新后的回调函数-2
store.subscribe(function() {
  console.log('监听函数-2:', store.getState());
});

// 发起请求：返回发起请求的action
/* eslint-disable-next-line */
const action = store.dispatch(fetchData);