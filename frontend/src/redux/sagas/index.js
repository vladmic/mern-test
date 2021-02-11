import { all, call } from 'redux-saga/effects';
import authSaga from './authSaga';
import todosSaga from './todosSaga';

export default function* rootSaga() {
  yield all([
    call(authSaga),
    call(todosSaga),
  ]);
}
