/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// redux-saga 学习代码
import * as redux from 'redux'
// console.log('redux:', redux)
import { applyMiddleware, combineReducers, createStore} from 'redux';

// reducer  为了描述action 如何改变state, 我们需要定义reducer
const reducer = (state = { num:  0 }, action) => {
  switch (action.type) {
    case 'ADD': 
      return  {num: (state.num + 1) };
      break;
    case 'DEC':
      return {num: (state.num - 1) };
    default:
     return state;
  }
}

const store = createStore(reducer)

const actionArrs = [
  {type: 'ADD', payload: '1'},
  {type: 'ADD', payload: '1'},
  {type: 'ADD', payload: '1'},
  {type: 'ADD', payload: '1'},
];
// 订阅store 发生变化后的回调
store.subscribe(() => {
  // console.log('state 已经更新了, params为：', store.getState())
});
// 定义actions 
// const actions = {
//   Add: 
// }
// console.log('store:', store)
//手动记录action
var addAction = {type: 'ADD', payload: '其它参数1'};
var subAction = {type: 'DEC', payload: '其它参数2'};

// 尝试封装
// function dispatchAndLog(store, action) {
//   console.log('dispatching:', action)
//   store.dispatch(action)
//   console.log('next-state:', store.getState())
// }

// 猴子补丁形式, 打印日志

var err = {};

// 在函数中返回新的dispatch
// function logger (store) {
//   var next = store.dispatch;
 
//   return function dispatchAndLog(action) {
//     console.log('dispatching', action)
//     var result = next(action)
//     console.log('next state', store.getState())
//     console.log('分割线：---------------')
//     throw {errno: 404, desc: '拒绝访问....'}
//     return result
//   }
// }


function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action)
      var result = next(action)
      console.log('next state', store.getState())
      throw {errno: 404, desc: '拒绝访问....'};
      return result
    }
  }
}


function crashReporter (store) {
  var next = store.dispatch;
 
  return function dispatchAndReport(action) {
    try {
      return next(action)
    } catch (e) {
      console.error('捕获一个异常!', e)
      // 记录异常
      err = e;
      console.log('记录的异常为：', e)
      throw e
    }
  }
}

const crashReporter2 = store => next => action => {
  try {
    return next(action)
  } catch (e) {
    console.error('捕获一个异常!', e)
    // 记录异常
    err = e;
    console.log('记录的异常为：', e)
    throw e
  }
}


// 应用monkeypatch 的方式
// function applyMiddlewareByMonkeypatching(store, middlewares) {
//   console.log(Array.isArray(middlewares))
//   middlewares = middlewares.slice()
//   // 这里反转的用意是?
//   // middlewares.reverse()

//   // 在每一个middleware 中变换dispatch
//   middlewares.forEach(middleware => {
//     store.dispatch = middleware(store)
//   });
// }

// applyMiddlewareByMonkeypatching(store, [logger, crashReporter]);


// 警告：这只是一种“单纯”的实现方式！
// 这 *并不是* Redux 的 API.
function fakeapplyMiddleware(store, ...middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()
  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )
  return Object.assign({}, store, { dispatch })
}

var fakeStore = fakeapplyMiddleware(store, crashReporter2,  logger)
console.log('fakeStore:', fakeStore)

var arr = [1,2,3];
var sum = arr.reduce(function(prev, cur, index, arr){
  console.log(prev, cur, index, arr)
  return prev + cur
},0)

const finallyState = actionArrs.reduce(reducer, { num:  0 });
console.log('sum:', sum, 'finallyState', finallyState)

// fakeStore.dispatch(addAction)
