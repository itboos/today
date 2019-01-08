/* eslint-disbale */
import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga  from './sagas'

import Counter from './Counter'
import reducer from './reducers'
import { resolve } from "dns";
// import './fakesaga'

const sagaMiddleware = createSagaMiddleware()

// 一个很简单的中间件, 就是发起action, 打印一下action
const doNothingMidddleware = ({dispatch, getState}) => { 
  // console.log('运行中间间....')
  return (next) => { 
    // console.log('here....')
    return action => {
      console.log('经过什么都不做的中间件....', action)
      return next(action)
    }
  }
} 


const store = createStore(
  reducer,
  // applyMiddleware(sagaMiddleware, doNothingMidddleware)
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})
function render() {
  ReactDOM.render(
    <Counter
      value={0}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} 
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      loginOut={
        () => {
          store.dispatch({
            type: 'LOGOUT', 
            payload: {user: 'zdl'}
          })
        }
      }
      showData = {() => {console.log('展示新的数据....')}} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)


// 发起一个请求
// setTimeout(() => {
//   action('FETCH_REQUESTED')
// }, 1000)
// setTimeout(()=> {
//   store.dispatch({type: 'LOGOUT', 
//                 payload: {user: 'zdl'}})
// }, 1000)

// store.dispatch({type: 'LOGIN_REQUEST', 
//                 payload: {user: 'zdl', password: '123'}})

// other 测试

function* generatorTest() {
  const res = yield fetchData()
  console.log(res)
}
function fetchData() {
  setTimeout(() => {
    return 'data'
  }, 2000)
}
const i = generatorTest();
var res1 = i.next()
var res2 = i.next()
console.log('res1, res2', res1, res2)
