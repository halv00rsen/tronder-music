const storageSpotifyStateKey = 'spotify-uuid';
const storageSpotifyAccessToken = 'spotify-access-token';
const storageSpotifyInvalidateTime = 'spotify-invalidate-time';
const storageSpotifyTokenType = 'spotify-token-type';

export const getSpotifyState = () => {
  return sessionStorage.getItem(storageSpotifyStateKey);
};

export const setSpotifyState = (state: string) => {
  sessionStorage.setItem(storageSpotifyStateKey, state);
};

export const setInvalidTime = (time: number) => {
  sessionStorage.setItem(storageSpotifyInvalidateTime, `${time}`);
};

export const getInvalidTime = () => {
  const time = sessionStorage.getItem(storageSpotifyInvalidateTime);
  return (time && Number(time)) || undefined;
};

export const setTokenType = (tokenType?: string) => {
  if (tokenType) {
    sessionStorage.setItem(storageSpotifyTokenType, tokenType);
  }
};

export const setAccessToken = (token?: string) => {
  if (token) {
    sessionStorage.setItem(storageSpotifyAccessToken, token);
  }
};

export const getAccessToken = () => {
  return sessionStorage.getItem(storageSpotifyAccessToken);
};
