import React from 'react';
import { AppStateProvider } from './context/app';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './components/Routes';

function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <Routes />
      </AppStateProvider>
    </BrowserRouter>
  );
}

export default App;
