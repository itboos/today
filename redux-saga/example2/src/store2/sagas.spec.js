/* saga 测试用例 */

import test from 'tape';
import {FETCH_DATA, FETCH_DATA_SUCCESS} from './type';

import { put, call } from 'redux-saga/effects'
import { fetchData, delay } from './sagas2'
console.log('test:', test)

test('fetchData Saga test', (assert) => {
  const gen = fetchData()

  assert.deepEqual(
    gen.next().value,
    call(delay, 2000),
    'fetchData Saga must call delay(2000)'
  )

  assert.deepEqual(
    gen.next().value,
    put({type: FETCH_DATA_SUCCESS}),
    'fetchData Saga must dispatch an FETCH_DATA_SUCCESS'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'fetchData Saga must be done'
  )

  assert.end()
});

