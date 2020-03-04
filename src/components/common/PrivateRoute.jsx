import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (localStorage.getItem(ACCESS_TOKEN) ? (
      <Component {...rest} {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    ))}
  />
);

export default PrivateRoute;