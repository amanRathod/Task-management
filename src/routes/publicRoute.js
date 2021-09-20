/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import UserContext from '../utils/context/user';
import * as ROUTES from '../constants/routes';

const PublicRoute = ({ component: Component, ...rest }) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => (!user ? <Redirect to={ROUTES.LOGIN} /> : <Component {...props} />)}
    />
  );
};
export default PublicRoute;
