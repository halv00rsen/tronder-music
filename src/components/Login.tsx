import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useLoggedInSelector } from '../context/app';
import { redirectToSpotifyLogin } from '../service/spotify';
import { getSpotifyState } from '../service/storage';
import { useSpotifyParameters } from './useSpotifyParameters';

export const Login = () => {
  const loggedIn = useLoggedInSelector();
  const appDispatch = useAppDispatch();

  const spotifyParameters = useSpotifyParameters();

  useEffect(() => {
    if (spotifyParameters) {
      const persistedState = getSpotifyState();
      if (persistedState !== spotifyParameters.state) {
        throw new Error('State has mismatch, cannot continue login.');
      }
      appDispatch({
        accessToken: spotifyParameters.accessToken,
        type: 'set-credentials',
      });
    }
  }, [spotifyParameters, appDispatch]);

  if (loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h4>Please log into Spotify to use this application</h4>
      <button onClick={redirectToSpotifyLogin}>Login</button>
    </div>
  );
};
