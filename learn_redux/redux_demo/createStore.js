export default function createStore(reducer, initState, rewriteCreateStoreFunc) {
  // 第二个参数 是 inhance 的情况.
  if (typeof initState === 'function'){
    rewriteCreateStoreFunc = initState;
    initState = {};
  }
   // 如果有 rewriteCreateStoreFunc，那就采用新的 createStore, 即会返回应用了中间件的 dispatch
  if (typeof rewriteCreateStoreFunc === 'function') {
    const newCreateStore = rewriteCreateStoreFunc(createStore)
    return newCreateStore(reducer, initState)
  }

  let state = initState || {}
  const listeners = []

  const subscribe = function(listener) {
    listeners.push(listener)
    // 返回取消订阅函数
    return function unsubscribe(listener) {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  const getState = function() {
    return state
  }

  const dispatch = function(action) {
    state = reducer(state, action)
    // 发布通知
    listeners.forEach(function(fn) {
      fn()
    })
    return action
  }
  
  // 替换 reducer
  function replaceReducer(nextReducer) {
    reducer = nextReducer
    /*刷新一遍 state 的值，新来的 reducer 把自己的默认状态放到 state 树上去*/
    dispatch({ type: `@@INIT${Math.random()}` })
  }
  // 执行一个 未定义的 type 类型， 用来初始化 state
  dispatch({ type: `@@INIT${Math.random()}` })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }
}
