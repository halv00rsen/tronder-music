import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppState, useLoggedInSelector } from '../context/app';
import { SpotifyStateProvider } from '../context/spotify';
import { SecureRoutes } from './SecureRoutes';
import styled from 'styled-components';
import { SpotifyMenu } from './secure/SpotifyMenu';

const Menu = styled.div`
  border-right: 1px solid gray;
`;

const Content = styled.div`
  overflow: auto;
  width: 100%;
  padding-bottom: 70px;
`;

export const SecureApp = () => {
  const loggedIn = useLoggedInSelector();
  const { accessToken } = useAppState();

  if (loggedIn === 'notLoggedIn' || !accessToken) {
    return <Redirect to="/login" />;
  }
  return (
    <SpotifyStateProvider>
      <Menu>
        <SpotifyMenu />
      </Menu>
      <Content>
        <SecureRoutes accessToken={accessToken} />
      </Content>
    </SpotifyStateProvider>
  );
};
