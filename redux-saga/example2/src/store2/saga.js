import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import http from './common/http';
import {FETCH_DATA, FETCH_DATA_SUCCESS} from './type';

// worker Saga: 将会在 FETCH_DATA action 时触发
function *fetchData(action) {
  try{
    const user = yield call(http.get, 'users/itboos', {host: 'Base', data: { id: action.payload.id }})
    // 这里可以对拿到的数据进行一些操作
    yield put({type: FETCH_DATA_SUCCESS, payload: user})
  } catch(e) {
    console.log('e', e)
  }
}

// watch saga 监听某个指定的action-type, 当监听到指定类型的 actionType 时，使用指定的workSaga进行处理
/* 不允许并发请求， 只使用最新的那个请求 */
function *watchFetchDataSaga() {
  yield takeLatest(FETCH_DATA, fetchData)
}

export default watchFetchDataSaga;