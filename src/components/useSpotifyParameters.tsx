import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { persistAccessToken } from '../service/spotify';

interface Params {
  [key: string]: string | undefined;
}

const useHashFragments = () => {
  const location = useLocation();

  const [fragments, setFragments] = useState<Params | undefined>(undefined);

  useEffect(() => {
    const hash = location.hash;
    const values = hash.split('&').map((value) => {
      const data = value.replace('#', '').split('=');
      return {
        key: data[0],
        value: data[1],
      };
    });
    const data: Params = {};
    values.forEach((elem) => {
      data[elem.key] = elem.value;
    });
    setFragments(data);
  }, [location.hash]);

  return fragments;
};

interface SpotifyParams {
  accessToken: string;
  expiresIn: string;
  tokenType: string;
  state: string;
  expireTime: number;
}

export const useSpotifyParameters = () => {
  const fragments = useHashFragments();
  const [spotifyInfo, setSpotifyInfo] = useState<SpotifyParams | undefined>(
    undefined
  );

  useEffect(() => {
    if (fragments) {
      if (
        fragments['access_token'] &&
        fragments['expires_in'] &&
        fragments['token_type'] &&
        fragments['state']
      ) {
        const token = {
          accessToken: fragments['access_token'],
          expiresIn: fragments['expires_in'],
          tokenType: fragments['token_type'],
          state: fragments['state'],
        };
        const invalid = new Date().getTime() + Number(token.expiresIn) * 1000;
        persistAccessToken(token.accessToken, invalid);
        setSpotifyInfo({
          ...token,
          expireTime: invalid,
        });
        return;
      }
    }
    setSpotifyInfo(undefined);
  }, [fragments]);

  return spotifyInfo;
};
