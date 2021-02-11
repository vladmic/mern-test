import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { CLEAR_REDUX_STORE } from '../actions/constants';

import authReducer from './auth';
import todosReducer from './todos';

const appReducer = history =>
  combineReducers({
    auth: authReducer,
    todos: todosReducer,
    router: connectRouter(history),
  });

const rootReducer = history => (state, action) => {
  if (action.type === CLEAR_REDUX_STORE) {
    return appReducer(history)(undefined, action);
  }
  return appReducer(history)(state, action);
};

export default rootReducer;
