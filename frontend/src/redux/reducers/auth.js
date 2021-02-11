import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTRATION_USER_REQUEST,
  REGISTRATION_USER_SUCCESS,
  REGISTRATION_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  SET_IS_AUTHENTICATED,
} from '../actions/constants';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  data: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
      }
    }
    case LOGIN_USER_FAIL: {
      const { error } = payload;
      return {
        ...state,
        isLoading: false,
        error,
      }
    }
    case SET_IS_AUTHENTICATED: {
      return {
        ...state,
        werwer: 123,
        isAuthenticated: true,
      }
    }
    case REGISTRATION_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case REGISTRATION_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case REGISTRATION_USER_FAIL: {
      const { error } = payload;
      return {
        ...state,
        isLoading: false,
        error,
      }
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      }
    }
    case LOGOUT_USER_FAIL: {
      const { error } = payload;
      return {
        ...state,
        isLoading: false,
        error,
      }
    }
    default: return state;
  }
}

export default authReducer;
