/* eslint-disbale */
import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, select, call, take } from 'redux-saga/effects'
import request from './fetch'


function* helloSaga() {
  console.log('Hello Sagas!');
}

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
  yield call(delay, 1000)
  console.log('incrementAsync....')
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
// 获取数据
function* fetchData(action) {
  const url = 'https://api.github.com/users/itboos'
  console.log('fetchData....')
   try {
      const data = yield call(request, url)
      yield put({type: "FETCH_SUCCEEDED", payload: data})
   } catch (error) {
      // yield put({type: "FETCH_FAILED", error})
   }
}
// 产生一个task 当每次 dispatch  'FETCH_REQUESTED' 时
function* watchFetchData() {
  // yield takeEvery('FETCH_REQUESTED', fetchData)
  yield takeLatest('FETCH_REQUESTED', fetchData)
}


// start------------
const Api = {
  store: {
    token: '',
  },
  authorize: (user, password) => {
    console.log(user, password)
  },
  storeItem: (token) => {
    console.log('存储token：', token)
    this.store.token = token;
  },
  clearItem: ()=> {
    console.log('清除token：', token)
    this.store.token = '';
  }
}
function* watchLOGIN_REQUEST() {
  yield takeLatest('LOGIN_REQUEST', loginRequest)
}
function loginRequest() {
  return {
    user: 'zdl',
    password: '123'
  }
}
// 认证
function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password)
    if (token) {
      yield call(Api.storeItem, {token})
      yield take('LOGOUT')
      yield call(Api.clearItem, 'token')
    }
  }
}

// end------------



// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchFetchData(),
    loginFlow()
  ])
}

export { incrementAsync }