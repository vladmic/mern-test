import { put, takeLatest, select, call } from "redux-saga/effects";
import axios from 'axios';

import {
  ADD_TODO_REQUEST,
  UPDATE_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  GET_ALL_TODOS_REQUEST,
} from '../actions/constants';
import { API_URL, TOKEN } from '../../utils/routerConstants';
import {
  addTodoSuccess,
  getAllTodosFail,
  getAllTodosRequest,
  getAllTodosSuccess,
  deleteTodoSuccess,
  deleteTodoFail,
} from "../actions";


function* preloadData() {
  const limit = yield select((state) => state.todos?.limit) || 10;
  const page = yield select((state) => state.todos?.page) || 1;

  yield put(getAllTodosRequest({ limit, page }));
}

function* getAllTodosSaga(action) {
  try {
    const { payload: { limit: incomeLimit = 10, page: incomePage = 1 } } = action;
    const token = localStorage.getItem(TOKEN);
    const { data: { todos, page, totalPages, limit } } = yield axios.request({
      method: 'GET',
      url: `${API_URL}/todos?limit=${incomeLimit}&page=${incomePage}`,
      headers: {
        'Authorization': token,
      }
    });
    yield put(getAllTodosSuccess({
      todos, page, totalPages, limit
    }));
  } catch (err) {
    yield put(getAllTodosFail(err));
  }
}

function* addTodoSaga(action) {
  try {
    const token = localStorage.getItem(TOKEN);
    const { payload: { text } } = action;
    const { data } = yield axios.request({
      method: 'POST',
      url: `${API_URL}/todos`,
      data: {
        text,
      },
      headers: {
        'Authorization': token,
      }
    });
    yield put(addTodoSuccess({}));
    yield call(preloadData);
  } catch (err) {
    yield put(addTodoSuccess(err));
  }
}

function* updateTodoSaga(action) {
  try {
    const token = localStorage.getItem(TOKEN);
    const { payload: { id, completed, text } } = action;
    const oldItem = yield select((state) => state.todos?.todoList?.find((item) => item._id === id)) ?? {};
    const { data } = yield axios.request({
      method: 'PATCH',
      url: `${API_URL}/todos`,
      data: {
        ...oldItem,
        id,
        ...(text ? { text } : {}),
        ...(completed !== undefined ? { completed } : {}),
      },
      headers: {
        'Authorization': token,
      }
    });
    yield put(addTodoSuccess({}));
    yield call(preloadData);
  } catch (err) {
    yield put(addTodoSuccess(err));
  }
}

function* deleteTodoSaga(action) {
  try {
    const token = localStorage.getItem(TOKEN);
    const { payload: { id } } = action;
    yield axios.request({
      method: 'DELETE',
      url: `${API_URL}/todos/id/${id}`,
      data: {
      },
      headers: {
        'Authorization': token,
      }
    });
    yield put(deleteTodoSuccess());
    yield call(preloadData);
  } catch (error) {
    yield put(deleteTodoFail(error));
  }
}

function* watch() {
  yield takeLatest(GET_ALL_TODOS_REQUEST, getAllTodosSaga);
  yield takeLatest(ADD_TODO_REQUEST, addTodoSaga);
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodoSaga);
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodoSaga);
}

export default watch;
