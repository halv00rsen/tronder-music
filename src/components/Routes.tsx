import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useLoggedInSelector } from '../context/app';
import { Loading } from './Loading';
import { Login } from './Login';
import { SecureApp } from './SecureApp';
import { useS3UrlFix } from './useS3UrlFix';

export const Routes = () => {
  useS3UrlFix();
  const loggedIn = useLoggedInSelector();

  if (loggedIn === 'pending') {
    return <Loading loadingMessage="Loading application" />;
  }
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
