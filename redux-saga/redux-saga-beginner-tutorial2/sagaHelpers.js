// 测试辅助函数
import request from './fetch'

import { call, put } from 'redux-saga/effects'

function* fetchData(action) {
  console.log('fetchData....')
  const url = 'https://api.github.com/users/itboos'
   try {
      const data = yield call(request, url)
      console.log('data:', data)
      // yield put({type: "FETCH_SUCCEEDED", data})
   } catch (error) {
      // yield put({type: "FETCH_FAILED", error})
   }
}

import { takeEvery } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'

function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}

