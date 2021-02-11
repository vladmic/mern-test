import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';

import { API_URL, ROUTES_CONSTANTS, TOKEN } from '../../utils/routerConstants';
import {
  LOGIN_USER_REQUEST,
  LOGOUT_USER_REQUEST,
  REGISTRATION_USER_REQUEST,
} from "../actions/constants";
import {
  registrationUserSuccess,
  registrationUserFail,
  loginUserFail,
  loginUserSuccess,
  logoutUserSuccess,
  logoutUserFail,
} from "../actions";

function* loginUserSaga(action) {
  try {
    const { payload: { email, password } } = action;
    const { data } = yield axios.request({
      method: 'POST',
      url: `${API_URL}/auth/login`,
      data: {
        email,
        password
      }
    });
    const { token } = data;
    yield put(loginUserSuccess(token));
    localStorage.setItem(TOKEN, token);
    yield put(push(ROUTES_CONSTANTS.todos));
  } catch (err) {
    yield put(loginUserFail(err));
  }
}

function* registrationUserSaga(action) {
  try {
    const { payload: { email, password } } = action;
    const { data: { token } } = yield axios.request({
      method: 'POST',
      url: `${API_URL}/auth/register`,
      data: {
        email,
        password
      }
    });
    yield put(registrationUserSuccess(token));
    localStorage.setItem(TOKEN, token);
    yield put(push(ROUTES_CONSTANTS.todos));
  } catch (err) {
    yield put(registrationUserFail(err))
  }
}

function* logOutUserSaga() {
  try {
    localStorage.removeItem(TOKEN);
    yield put(logoutUserSuccess());
    yield put(push(ROUTES_CONSTANTS.login));
  } catch (err) {
    yield put(logoutUserFail(err))
  }
}

function* watch() {
  yield takeLatest(LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(REGISTRATION_USER_REQUEST, registrationUserSaga);
  yield takeLatest(LOGOUT_USER_REQUEST, logOutUserSaga);
}

export default watch;
