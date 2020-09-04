import React, { Suspense } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Spinner from "./Spinner";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfile from "./body/user/UserProfile";
import Dashboard from "./body/Dashboard";
import DataTable from "./body/DataTable";
import NewDoc from "./body/documents/NewDoc";
import Directory from "./body/Directory";
import EditDoc from './body/documents/EditDoc';
import InputDoc from './body/documents/InputDoc';

export default function Routes(props) {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {/* SIDE NAVBAR */}

        <Route path="/" exact>
          {props.documents.length > 0 ? <Dashboard {...props} /> : <Spinner />}
        </Route>

        <Route path="/library">
          <DataTable documents={props.documents} />
        </Route>

        <Route path="/directory">
          {props.documents.length > 0 ? <Directory {...props} /> : <Spinner />}
        </Route>

        {/* DOCUMENTS */}

        <Route path="/documents/new">
          {props.user ? <NewDoc {...props} /> : <Redirect to="/login" />}
        </Route>

        <Route path="/documents/edit/:id">
          {props.documents.length > 0 ? <EditDoc {...props} /> : <Spinner />}
        </Route>

        <Route path="/documents/input/:id">
          {props.documents.length > 0 && props.user ? (
            <InputDoc {...props} />
          ) : (
            <Spinner />
          )}
        </Route>

        {/* AUTH */}

        <Route path="/login">
          {props.isAuth ? (
            <Redirect to="/" />
          ) : (
            <Login handleLogin={props.handleLogin} />
          )}
        </Route>

        <Route path="/register">
          <Register handleRegister={props.handleRegister} />
        </Route>

        <Route path="/users/:id">
          {props.isAuth ? (
            <UserProfile user={props.user} />
          ) : (
            <Login handleLogin={props.handleLogin} />
          )}
        </Route>

        {/* TEST PAGES */}

        <Route path="/spinner">
          <Spinner />
        </Route>
      </Switch>
    </Suspense>
  );
}