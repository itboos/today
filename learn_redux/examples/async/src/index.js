import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

// const store = createStore(
//   reducer,
//   applyMiddleware(...middleware)
// )
// 开启redux-devtool 调试工具
let store
if (!window.__REDUX_DEVTOOLS_EXTENSION__ ) {
  store = createStore(
    reducer,
    applyMiddleware(thunk)
  );
} else {
  store = createStore(
    reducer,
    compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //插件调试，未安装会报错
  );
}

export default store

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
