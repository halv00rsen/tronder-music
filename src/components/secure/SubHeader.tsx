import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MENU_VIEWS } from '../../service/views';
import { Header } from './SpotifyMenu';

const Navigation = () => {
  const history = useHistory();

  const next = () => {
    history.goForward();
  };

  const back = () => {
    history.goBack();
  };

  return (
    <div>
      <button onClick={back}>Back</button>
      <button onClick={next}>Next</button>
    </div>
  );
};

export const SubHeader = () => {
  const location = useLocation();
  const [header, setHeader] = useState<string | undefined>(undefined);

  useEffect(() => {
    const view = MENU_VIEWS.find((view) => view.path === location.pathname);
    if (view) {
      setHeader(view.friendlyName);
    } else {
      setHeader(undefined);
    }
  }, [location.pathname]);

  return (
    <Header>
      <div>{header}</div>
      <Navigation />
    </Header>
  );
};
