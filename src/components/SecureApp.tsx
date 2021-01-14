import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppState, useLoggedInSelector } from '../context/app';
import { SpotifyStateProvider } from '../context/spotify';
import { SecureRoutes } from './SecureRoutes';
import styled from 'styled-components';
import { SpotifyMenu } from './secure/SpotifyMenu';
import { SubHeader } from './secure/SubHeader';

const Menu = styled.div`
  border-right: 1px solid gray;
`;

const Content = styled.div`
  overflow: auto;
  width: 100%;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;
`;

export const SecureApp = () => {
  const loggedIn = useLoggedInSelector();
  const { accessToken } = useAppState();

  if (
    loggedIn === 'notLoggedIn' ||
    loggedIn === 'expireToken' ||
    !accessToken
  ) {
    return <Redirect to="/login" />;
  }
  return (
    <SpotifyStateProvider>
      <Menu>
        <SpotifyMenu />
      </Menu>
      <Content>
        <SubHeader />
        <SecureRoutes accessToken={accessToken} />
      </Content>
    </SpotifyStateProvider>
  );
};
