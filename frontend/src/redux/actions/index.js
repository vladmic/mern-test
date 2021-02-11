import {
 LOGIN_USER_REQUEST,
 LOGIN_USER_SUCCESS,
 LOGIN_USER_FAIL,
 SET_IS_AUTHENTICATED,
 REGISTRATION_USER_REQUEST,
 REGISTRATION_USER_SUCCESS,
 REGISTRATION_USER_FAIL,
 LOGOUT_USER_REQUEST,
 LOGOUT_USER_SUCCESS,
 LOGOUT_USER_FAIL,
 GET_ALL_TODOS_REQUEST,
 GET_ALL_TODOS_SUCCESS,
 GET_ALL_TODOS_FAIL,
 UPDATE_TODO_REQUEST,
 UPDATE_TODO_SUCCESS,
 UPDATE_TODO_FAIL,
 DELETE_TODO_REQUEST,
 DELETE_TODO_SUCCESS,
 DELETE_TODO_FAIL, ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAIL,
} from './constants';


export const loginUserRequest = (payload) => ({ type: LOGIN_USER_REQUEST, payload });
export const loginUserSuccess = (payload) => ({ type: LOGIN_USER_SUCCESS, payload });
export const loginUserFail = (payload) => ({ type: LOGIN_USER_FAIL, payload });

export const setIsAuthenticated = () => ({ type: SET_IS_AUTHENTICATED });

export const registrationUserRequest = (payload) => ({ type: REGISTRATION_USER_REQUEST, payload });
export const registrationUserSuccess = (payload) => ({ type: REGISTRATION_USER_SUCCESS, payload });
export const registrationUserFail = (payload) => ({ type: REGISTRATION_USER_FAIL, payload });

export const logoutUserRequest = (payload) => ({ type: LOGOUT_USER_REQUEST, payload });
export const logoutUserSuccess = (payload) => ({ type: LOGOUT_USER_SUCCESS, payload });
export const logoutUserFail = (payload) => ({ type: LOGOUT_USER_FAIL, payload });

export const getAllTodosRequest = ({ page, limit }) => ({ type: GET_ALL_TODOS_REQUEST, payload: { page, limit } });
export const getAllTodosSuccess = (payload) => ({ type: GET_ALL_TODOS_SUCCESS, payload });
export const getAllTodosFail = (payload) => ({ type: GET_ALL_TODOS_FAIL, payload });

export const updateTodoRequest = ({ completed, text, id }) => ({
 type: UPDATE_TODO_REQUEST,
 payload: { completed, text, id }
});
export const updateTodoSuccess = (payload) => ({ type: UPDATE_TODO_SUCCESS, payload });
export const updateTodoFail = payload => ({ type: UPDATE_TODO_FAIL, payload });

export const addTodoRequest = (payload) => ({ type: ADD_TODO_REQUEST, payload });
export const addTodoSuccess = (payload) => ({ type: ADD_TODO_SUCCESS, payload });
export const addTodoFail = payload => ({ type: ADD_TODO_FAIL, payload });

export const deleteTodoRequest = ({ id }) => ({ type: DELETE_TODO_REQUEST, payload: { id } });
export const deleteTodoSuccess = (payload) => ({ type: DELETE_TODO_SUCCESS, payload });
export const deleteTodoFail = (payload) => ({ type: DELETE_TODO_FAIL, payload });

