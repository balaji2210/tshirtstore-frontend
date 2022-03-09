import React from 'react'
import {Route,Redirect} from "react-router-dom"
import { isAuthenticated } from './index'



function PrivateRoute({ component:Component, ...rest }) {
    let auth = isAuthenticated();
    return (
      <Route
        {...rest}
        render={props =>
          auth.user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }


export default PrivateRoute

