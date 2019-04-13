import { call, apply, all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import http from './common/http';
import {FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILED} from './type';

// 延时函数
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// 其它工作saga
function *helloSaga() {
  function sayHi() {
    console.log('run hello saga....');
  }
  yield sayHi();
}

// worker Saga: 将会在 FETCH_DATA action 时触发
function *fetchData(action) {
   // yield delay(2000); // 延时2s发起请求
  // 相比直接使用yield fn, 我们使用call， 这样做的目的是方便测试
  yield call(delay, [2000]);
  console.log('call(delay, 2000)', call(delay, 2000))
  try{
    const user = yield call(http.get, 'users/itboos', {host: 'Base', data: { id: action.payload.id }})
    // 这里可以对拿到的数据进行一些操作
    yield put({type: FETCH_DATA_SUCCESS, payload: user})
  } catch(e) {
    console.log('e', e)
    // 处理错误
    yield put({type: FETCH_DATA_FAILED, payload: e});
  }
}

// watch saga 监听某个指定的action-type, 当监听到指定类型的 actionType 时，使用指定的workSaga进行处理
/* 不允许并发请求， 只使用最新的那个请求 */
function *watchFetchDataSaga() {
  yield takeLatest(FETCH_DATA, fetchData)
}

// 测试使用 说明： call, put , apply 等方法返回的都是普通对象，（关于副作用的描述对象）
// var it = fetchData({payload: {id: '002'}});
// console.log(it.next())
// console.log(it.next())
// console.log(it.next({user: 'itboos', msg: 'fake Data...'}))
// console.log(it.next())

// 单一入口，启动所有saga all 里面的saga会并发执行
export default function *rootSaga() {
  yield all([
    helloSaga(),
    watchFetchDataSaga()
  ])
}