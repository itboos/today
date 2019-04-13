import { createStore, applyMiddleware } from 'redux'
import createSgaMiddleware  from 'redux-saga';

import rootReducer from './reducer'
// action 常量
import { fetchData } from './action';
import rootSaga from './saga'

// 创建saga middleware 中间件
const sagaMiddleware = createSgaMiddleware()
//注入根reducer， 应用中间件，创建store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// run saga middleware 
sagaMiddleware.run(rootSaga)
console.log('store:', store)

// 订阅state 更新后的回调函数-1
store.subscribe(function() {
  // console.log('监听函数-1:', store.getState());
});

// 订阅state 更新后的回调函数-2
store.subscribe(function() {
  // console.log('监听函数-2:', store.getState());
});

// 发起请求：返回发起请求的action
/* eslint-disable-next-line */
const action = store.dispatch(fetchData);

// 由于网路请求存在副作用，它会使得我们的reducer不纯，所以，我们不因该在 reducer 里写网络请求的代码。
// 由于中间件可以在 dispatch action 之后，到达reducer 之前做一些操作，所以，我们可以利用中间件来做网络请的操作，类似的网络请求有很多种，redux-saga 只是其中一种.

