import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Spinner from "./navigation/Spinner"
import Login from './auth/Login';
import Register from './auth/Register';
import UserProfile from "./user/UserProfile";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./body/Dashboard";

export default function Routes(props) {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Switch>

          <Route path="/login">
            <Login handleLogin={props.handleLogin} />
          </Route>

          <Route path="/register">
            <Register handleRegister={props.handleRegister} />
          </Route>

          {/* <PrivateRoute path="/user" isAuth={props.isAuth}>
            <UserProfile />
          </PrivateRoute> */}

          <Route path="/user/:id">
            {props.isAuth ? (
              <UserProfile />
            ) : (
              <Login handleLogin={props.handleLogin}/>
            )}
          </Route>

          <Route path="/dashboard">
            <Dashboard {...props}/>
          </Route>
          
        </Switch>
      </Router>
    </Suspense>
  );
}