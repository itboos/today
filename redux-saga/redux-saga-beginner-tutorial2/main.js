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
import './fakesaga'

const sagaMiddleware = createSagaMiddleware()

// 一个很简单的中间件, 就是 发起action, 打印一下action
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
  applyMiddleware(sagaMiddleware, doNothingMidddleware)
)
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})
function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} 
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
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

// other 测试
