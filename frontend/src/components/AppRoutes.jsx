import React, { Suspense } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Spinner from "./Spinner"
import Login from './auth/Login';
import Register from './auth/Register';
import UserProfile from "./user/UserProfile";
import Dashboard from "./body/Dashboard";
import DataTable from './body/DataTable';
import NewDoc from './body/NewDoc';

export default function Routes(props) {
  return (
    <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/login">
            {props.isAuth ? 
              <Redirect to="/" /> 
              :
              <Login handleLogin={props.handleLogin} />
            }
          </Route>

          <Route path="/register">
            <Register handleRegister={props.handleRegister} />
          </Route>

          <Route path="/library">
            <DataTable documents={props.documents} />
          </Route>
          
          <Route path="/documents/new">
            <NewDoc users={props.users}/>
          </Route>

          <Route path="/user/profile">
            <NewDoc users={props.users}/>
          </Route>

          <Route path="/user/:id">
            {props.isAuth ? (
              <UserProfile />
            ) : (
              <Login handleLogin={props.handleLogin} />
            )}
          </Route>

          <Route path="/">
            <Dashboard {...props} />
          </Route>

        </Switch>
    </Suspense>
  );
}