/* eslint-disbale */
import { delay } from 'redux-saga'
import { put, race, takeEvery, takeLatest, all, select, call, take, fork, cancel } from 'redux-saga/effects'
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
    const p = new Promise((resolve,reject)=> {
      setTimeout(() => {
        console.log('resolve>...')
        resolve('tokenabc...')
      }, 2000)
    })
    return p
  },
  storeItem: (token) => {
    console.log('存储token：', token)
    Api.store.token = token;
  },
  clearItem: ()=> {
    Api.store.token = '';
    console.log('清除token....')
  }
}
// 认证
function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', payload: {token}})
    yield call(Api.storeItem, {token})
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow() {
  while (true) {
    console.log('take 返回值：', take('LOGIN_REQUEST'))
    const {user, password} = (yield take('LOGIN_REQUEST')).payload

    // fork return a Task object
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGOUT'){
      console.log('取消任务....')
      yield cancel(task)
    }
    yield call(Api.clearItem, 'token')
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
    loginFlow(),
    fetchPostsWithTimeout() // 测试race
  ])
}

// 测试 race
function* fetchPostsWithTimeout() {
  const {token, timeout} = yield race({
    token: call(Api.authorize, '/posts'),
    timeout: call(delay, 4000)
  })
  console.log('token:', token)
  if (token)
   console.log('请求成功....')
  else
    console.log('4s 超时....')
}


export { incrementAsync }