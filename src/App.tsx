import React from 'react';
import { AppStateProvider } from './context/app';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './components/Routes';
import { ClientVersion } from './components/ClientVersion';

function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <Routes />
        <ClientVersion />
      </AppStateProvider>
    </BrowserRouter>
  );
}

export default App;
