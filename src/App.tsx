import React from 'react';
import { AppStateProvider } from './context/app';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './components/Routes';
import { ClientVersion } from './components/ClientVersion';
import styled from 'styled-components';
import { mainBackground, mainColor } from './utils/constants';

const AppUI = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
  background-color: ${mainBackground};
  color: ${mainColor};
`;

function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <AppUI>
          <Routes />
          <ClientVersion />
        </AppUI>
      </AppStateProvider>
    </BrowserRouter>
  );
}

export default App;
