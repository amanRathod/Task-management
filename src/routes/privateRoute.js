/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import UserContext from '../utils/context/user';
import * as ROUTES from '../constants/routes';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />)}
    />
  );
};
export default PrivateRoute;
