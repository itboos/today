/* eslint-disbale */
import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects'
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
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchFetchData()
  ])
}

export { incrementAsync }