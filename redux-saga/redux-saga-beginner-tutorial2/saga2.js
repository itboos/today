import { select, takeEvery } from 'redux-saga/effects'

function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    console.log('action')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  })
}