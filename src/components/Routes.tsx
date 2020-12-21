import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './Login';
import { SecureApp } from './SecureApp';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <SecureApp />
      </Route>
    </Switch>
  );
};
