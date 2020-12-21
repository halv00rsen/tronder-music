import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppState, useLoggedInSelector } from '../context/app';
import { SpotifyStateProvider } from '../context/spotify';
import { SecureRoutes } from './SecureRoutes';
import styled from 'styled-components';
import { SpotifyMenu } from './secure/SpotifyMenu';
import { mainBackground, mainColor } from '../utils/constants';

const App = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
  background-color: ${mainBackground};
  color: ${mainColor};
`;

const Menu = styled.div`
  border-right: 1px solid gray;
`;

const Content = styled.div`
  overflow: auto;
  width: 100%;
`;

export const SecureApp = () => {
  const loggedIn = useLoggedInSelector();
  const { accessToken } = useAppState();

  if (!loggedIn || !accessToken) {
    return <Redirect to="/login" />;
  }
  return (
    <SpotifyStateProvider>
      <App>
        <Menu>
          <SpotifyMenu />
        </Menu>
        <Content>
          <SecureRoutes accessToken={accessToken} />
        </Content>
      </App>
    </SpotifyStateProvider>
  );
};
