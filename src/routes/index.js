import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import UserAuthListener from '../constants/user-auth';
import UserContext from '../utils/context/user';

const PublicRoute = lazy(() => import('./publicRoute'));
const PrivateRoute = lazy(() => import('./privateRoute'));

const Login = lazy(() => import('../view/public/login'));
const Register = lazy(() => import('../view/public/register'));
const Dashboard = lazy(() => import('../view/private/dashboard'));
const Edit = lazy(() => import('../view/private/edit-task'));

const reloader = () => <p>loading</p>;

const App = () => {
  const user = UserAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={reloader()}>
          <Switch>
            <PublicRoute path={ROUTES.LOGIN} component={Login} />
            <PublicRoute path={ROUTES.REGISTER} component={Register} />
            <PrivateRoute path={ROUTES.DASHBOARD} component={Dashboard} exact />
            <PrivateRoute path={ROUTES.EDIT} component={Edit} exact />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
