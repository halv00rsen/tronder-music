import React from 'react';
import styled from 'styled-components';
import { mainColor } from '../utils/constants';
import spotifyLogo from './../images/Spotify_Icon_RGB_White.png';

const LinkUI = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Link = styled.a`
  color: ${mainColor};
  &:visited {
    color: ${mainColor};
  }
`;

interface Props {
  externalUrls: SpotifyApi.ExternalUrlObject;
  customText?: string;
}

export const SpotifyLink = (props: Props) => {
  const text = props.customText || 'View on Spotify';
  return (
    <LinkUI>
      <img src={spotifyLogo} alt="Spofify Logo" width="21" />
      <Link href={props.externalUrls.spotify}>{text}</Link>
    </LinkUI>
  );
};
