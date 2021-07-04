import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'browserHistory';
import Project from 'Project';
import SignIn from 'Auth/SignIn';
import PageError from 'shared/components/PageError';
import DashBoard from 'Dashboard';
import ActivateAccount from 'Auth/Account/Activate';
import ForgotPassword from 'Auth/Password/Forgot';
import ResetPassword from 'Auth/Password/Reset';
import User from 'User';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/dashboard" component={DashBoard} />
      <Route path="/auth/account/activate/:id" component={ActivateAccount} />
      <Route path="/auth/password/forgot" component={ForgotPassword} />
      <Route path="/auth/password/change" component={ForgotPassword} />
      <Route path="/auth/password/reset/:id" component={ResetPassword} />
      <Route path="/user/profile/:username" component={User}/>
      <Route path="/signin" component={SignIn} />
      <Route path="/project/:slug" component={Project} />
      <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
