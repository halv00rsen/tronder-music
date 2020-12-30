import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch, useLoggedInSelector } from '../context/app';
import { redirectToSpotifyLogin } from '../service/spotify';
import { getSpotifyState } from '../service/storage';
import { useSpotifyParameters } from './useSpotifyParameters';

export const Login = () => {
  const [stateError, setStateError] = useState(false);
  const loggedIn = useLoggedInSelector();
  const appDispatch = useAppDispatch();

  const spotifyParameters = useSpotifyParameters();

  useEffect(() => {
    if (spotifyParameters) {
      const persistedState = getSpotifyState();
      if (
        persistedState === null ||
        persistedState !== spotifyParameters.state
      ) {
        console.log('setting state error!');
        setStateError(true);
      } else {
        appDispatch({
          accessToken: spotifyParameters.accessToken,
          type: 'set-credentials',
        });
      }
    }
  }, [spotifyParameters, appDispatch]);

  if (loggedIn) {
    return <Redirect to="/" />;
  } else if (stateError) {
    return (
      <div>
        An error happened while logging into Spotify. Please try logging in
        again here.
      </div>
    );
  }
  return (
    <div>
      <h4>Please log into Spotify to use this application</h4>
      <button onClick={redirectToSpotifyLogin}>Login</button>
    </div>
  );
};
