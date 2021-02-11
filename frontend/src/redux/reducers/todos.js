import {
  GET_ALL_TODOS_REQUEST,
  GET_ALL_TODOS_SUCCESS,
  GET_ALL_TODOS_FAIL,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL, ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAIL,
} from '../actions/constants';

const initialState = {
  isLoading: false,
  page: 1,
  limit: 10,
  totalPages: null,
  error: null,
  todoList: [],
};

const todosReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_TODOS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_ALL_TODOS_SUCCESS: {
      const { todos, page, limit, totalPages } = payload;

      console.log('GET_ALL_TODOS_SUCCESS -->', payload);
      return {
        ...state,
        isLoading: false,
        todoList: todos,
        page,
        limit,
        totalPages,
      }
    }
    case GET_ALL_TODOS_FAIL: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case ADD_TODO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ADD_TODO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case ADD_TODO_FAIL: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case UPDATE_TODO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case UPDATE_TODO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case UPDATE_TODO_FAIL: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case DELETE_TODO_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case DELETE_TODO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case DELETE_TODO_FAIL: {
      return {
        ...state,
        isLoading: false,
      }
    }
    default: return state;
  }
}

export default todosReducer;
