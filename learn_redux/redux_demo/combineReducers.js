// 组合 reducer 成一个 rootReducer
export default function combineReducers(reducers) {
  const fn = function(state, action) {
    // 组合过的 reducer
    const nextState = {}
    const reducerKeys = Object.keys(reducers)
    reducerKeys.forEach(function(reducerKey) {
      const subReducer = reducers[reducerKey]
      const subState = subReducer(state[reducerKey], action)
      nextState[reducerKey] = subState
    })
    // 这里 少了 判断每个 子的 state 是否 跟之前的 子 state 一样的逻辑，如果所有的 子 state 都没发生改变，那么，就直接 返回 旧的 state， 这样就不会导致 UI 重新渲染。
    return nextState
  }
  return fn
}