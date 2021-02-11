import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
import Todos from '../../pages/Todos';

export default function Body() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/">
        <Todos />
      </Route>
    </Switch>
  )
}
