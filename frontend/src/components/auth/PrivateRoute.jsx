import React from 'react';
import { Route, Redirect } from "react-router-dom";


export default function PrivateRoute({ children, isAuth, ...rest }) {
  return (
    <Route
      render={() =>
        isAuth ? 
        (
          children
        ) 
        : 
        (
          <Redirect
            to={"/login"}
          />
        )
      }
    />
  );
};