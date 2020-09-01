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
import ViewDoc from "./body/documents/ViewDoc";
import Directory from "./body/Directory";

export default function Routes(props) {
  return (
    <Suspense fallback={<Spinner />}>
        <Switch>


          {/* SIDE NAVBAR */}

          <Route path="/" exact>
            <Dashboard {...props} />
          </Route>

          <Route path="/library">
            <DataTable documents={props.documents} />
          </Route>

          <Route path="/directory">
            <Directory />
          </Route>


          {/* DOCUMENTS */}

          <Route path="/documents/new">
            <NewDoc {...props} />
          </Route>
          
          <Route path="/documents/view/:id">
            <ViewDoc {...props} />
          </Route>


          {/* AUTH */}

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

          <Route path="/users/:id">
            {props.isAuth ? (
              <UserProfile user={props.user}/>
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