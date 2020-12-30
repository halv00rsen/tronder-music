import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from './Login';
import { SecureApp } from './SecureApp';
import { useS3UrlFix } from './useS3UrlFix';

export const Routes = () => {
  useS3UrlFix();
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
