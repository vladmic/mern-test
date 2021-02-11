import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Todos from '../pages/Todos';

const MAIN_ROUTE = '';

export const API_URL = 'https://mern-test-back.herokuapp.com/api'

export const ROUTES_CONSTANTS = {
  login: `${MAIN_ROUTE}/login`,
  registration: `${MAIN_ROUTE}/registration`,
  todos: `${MAIN_ROUTE}/todos`,
  todo: `${MAIN_ROUTE}/todo`,
};

export const TOKEN = 'token';

export const ROUTES = [
  {
    path: ROUTES_CONSTANTS.login,
    component:  Login,
    exact: true,
  },
  {
    path: ROUTES_CONSTANTS.registration,
    component: Registration,
    exact: true,
  },
  {
    path: ROUTES_CONSTANTS.todos,
    component: Todos,
    exact: true,
  }
];


export default {
  routes: ROUTES_CONSTANTS,
};
