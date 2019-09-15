// 接收 createStore 为参数， 返回 一个 能返回增强了的 store 的 newCreateStore 方法.
export default function applyMiddleware(...middlewares) {
  return (createStore) => {
    // 也可以 使用 ...args
    const newCreateStore = (reducer, initState) => {
      let store = createStore(reducer, initState)
      const next = store.dispatch 
      // 构造中间件 的时候 不允许 dispatch
      let dispatch = () => {
        throw new Error(
          `Dispatching while constructing your middleware is not allowed. ` +
            `Other middleware would not be applied to this dispatch.`
        )
      }
      // 应用中间间
      const reversedMiddlewares = middlewares.reverse()
      // 根据 最小权限原则，我们不应该 把 整个 store 都传给中间件， 只需要把它需要用到的东西传给它就可以了，这里传了 getState, 和 dispatch
      // 部分的 store 功能
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      }

      // 实际上 是对 把 多个中间件 组合成了一个 函数， 先执行中间件的逻辑，最后才真正执行 dispatch 的代码。
      dispatch = (action) => {
        const fn = reversedMiddlewares.reduce((next, middleware) => {
          // return middleware(store)(next)
          return middleware(middlewareAPI)(next)
        }, next)
        fn(action)
        return action
      }
      // redux 里的写法是下面这样： 稍微难理解一点，也就是把组合好的函数 赋值给 dispatch 
      // const chain = middlewares.map(middleware => middleware(middlewareAPI))
      // dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
    return newCreateStore
  }
}

// middleWare 的写法：

// const loggerMiddleware = (store) => (next) => (action) => {
//   console.log('action', action);
//   next(action);
//   console.log('next state', store.getState());
// }