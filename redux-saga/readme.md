[Redux-Saga 实用指北](https://juejin.im/post/5ad83a70f265da503825b2b4)
https://github.com/mdn/fetch-examples
https://github.com/matthew-andrews/isomorphic-fetch

saga Effects:
  - call: 调用一个方法, 阻塞式调用
  - fork: 无阻塞调用
  - put: => {type: put} : dispatch 一个action
  - takeEvery: 对于每一个监听到的action, 产生一个新的task
  - take: 告诉中间件 等待一个特定的action,  它会暂停generator函数的执行，直到特定的action发生， generator会继续执行.
  - take('LOGIN_REQUEST') 的返回值:
  - {
     @@redux-saga/IO: true
     TAKE: {
       pattern: "LOGIN_REQUEST"
      }
  - }

  yield take('LOGIN_REQUEST') , 等待LOGIN_REQUEST， 返回值就是dispatch 传过来的 action

  如： store.dispatch({type: 'LOGIN_REQUEST', payload: {user: 'zdl'}})

为什么redux 需要使用 第三方库来fetch 数据？