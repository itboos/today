// 一个 更通俗易懂的 redux 讲解：https://github.com/brickspert/blog/issues/22
import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from  './applyMiddleware'

let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '前端九部',
    description: '我们都是前端爱好者！'
  }
}

const initCounter = {
  count: 0
}

const initInfo = {
  name: '前端九部',
  description: '我们都是前端爱好者！'
}

/*counterReducer, 一个子reducer*/
/*注意：counterReducer 接收的 state 是 state.counter*/
function counterReducer(state, action) {
  if (!state) {
    state = initCounter
  }
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    default:
      return state;
  }
}

/*InfoReducer，一个子reducer*/
/*注意：InfoReducer 接收的 state 是 state.info*/
function InfoReducer(state, action) {
  if (!state) {
    state = initInfo
  }
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}


// 把多个 子 reducer 组合 成一个  rootReducer .
const rootReducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});

// 不使用中间件
// let store  = createStore(rootReducer)


// 改变
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'ADD2' })
// store.dispatch({ type: 'SET_NAME', name: 'zack zhong' })
// store.dispatch({ type: 'SET_DESCRIPTION', description: '每次学习都要有新的收获...' })

// 中间功能，增强 dispath 的 功能  实现方法 1： 猴子补丁法：

// const originDispath = store.dispatch
// store.dispatch = function(action) {
//   console.log('action 改变前的 state:', action, store.getState())
//   originDispath.call(store, action)
//   console.log('action  改变后的 state:', action, store.getState())
// }

const loggerMiddleware = (store) => (next) => (action) => {
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
}

const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (err) {
    console.error('错误报告: ', err)
  }
}

const timeMiddleware = (store) => (next) => (action) => {
  console.log('time', new Date().getTime());
  next(action);
}

/*接收旧的 createStore，返回新的 createStore*/ 
// 在 redux 中 也称为  enhancer
const rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)

/*返回了一个 dispatch 被重写过的 store*/
// 使用中间件
const store = createStore(rootReducer, initState, rewriteCreateStoreFunc);
// eslint-disable-next-line
const unSubscribe = store.subscribe(function() {
  // eslint-disable-next-line
  const state = store.getState()
  // console.log('状态发生改变...新state:', state)
})
// store.dispatch({ type: 'SET_NAME', name: 'zack zhong...' })

// 测试 bindActionCreators：

/*返回 action 的函数就叫 actionCreator*/
function increment() {
  return {
    type: 'INCREMENT'
  }
}

function setName(name) {
  return {
    type: 'SET_NAME',
    name: name
  }
}
const actions = bindActionCreators({ increment, setName }, store.dispatch)
const action1 = actions.increment()
actions.increment()
actions.setName('zack zhang...')
console.log('action1:', action1)

const a2 = store.dispatch({ type: 'SET_NAME', name: 'zack zhong...' })
console.log('actions:', action1, a2)