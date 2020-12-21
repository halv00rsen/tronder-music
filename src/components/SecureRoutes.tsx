import React, { useEffect, useMemo, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import { SpotifyDispatch, useSpotifyDispatch } from '../context/spotify';
import { VIEWS } from '../service/views';
import { Loading } from './Loading';

const initialLoad = async (
  instance: SpotifyWebApi.SpotifyWebApiJs,
  dispatch: SpotifyDispatch
) => {
  const loadProfile = async () => {
    const response = await instance.getMe();
    dispatch({
      type: 'set-profile',
      profile: response,
    });
  };

  return Promise.all([loadProfile()]);
};

interface Props {
  accessToken: string;
}

export const SecureRoutes = ({ accessToken }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const dispatch = useSpotifyDispatch();

  const spotify = useMemo(() => {
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(accessToken);
    return spotify;
  }, [accessToken]);

  useEffect(() => {
    dispatch({
      type: 'set-spotify-instance',
      spotify,
    });
    initialLoad(spotify, dispatch)
      .catch(() => {
        setError('Error while loading data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [spotify, dispatch]);

  if (loading) {
    return <Loading loadingMessage="Loading spotify application" />;
  } else if (error !== undefined) {
    return <div>An error occured: {error}</div>;
  }
  return (
    <Switch>
      {VIEWS.map((view) => (
        <Route key={view.path} path={view.path} exact={view.exact}>
          {view.component}
        </Route>
      ))}
    </Switch>
  );
};
