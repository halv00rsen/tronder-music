import { v4 as uuidv4 } from 'uuid';
import {
  getAccessToken,
  getInvalidTime,
  setAccessToken,
  setInvalidTime,
  setSpotifyState,
} from './storage';

const spotifyUri = 'https://accounts.spotify.com/authorize';
const clientId = `client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}`;
const responseType = 'response_type=token';
const redirectUri = `redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}`;
const scope = `scope=${[
  'user-library-read',
  'user-read-email',
  'user-read-private',
].join(' ')}`;
const showDialog = 'show_dialog=true';

// user-library-read - album
// user-read-email - profile
// user-read-private - profile
// scopes for spotify: https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes

const spotifyAlbumUri = 'https://api.spotify.com/v1/me/albums';

export const redirectToSpotifyLogin = () => {
  const uuid = uuidv4();
  setSpotifyState(uuid);
  const url = `${spotifyUri}?${clientId}&${redirectUri}&${scope}&${responseType}&${showDialog}&state=${uuid}`;
  window.location.href = url;
};

export const persistAccessToken = (accessToken: string, expireDate: number) => {
  setAccessToken(accessToken);
  setInvalidTime(expireDate);
};

interface Token {
  accessToken: string;
  expireTime: number;
}

export const getPersistedAccessToken = (): Token | undefined => {
  const accessToken = getAccessToken();
  const expireTime = getInvalidTime();
  if (accessToken && expireTime) {
    return {
      accessToken,
      expireTime,
    };
  }
};

export const removePersistedState = () => {
  setAccessToken(undefined);
  setInvalidTime(0);
};

export const getSpotifyAlbums = async () => {
  const accessToken = getAccessToken();
  const response = await fetch(spotifyAlbumUri, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.json();
};
