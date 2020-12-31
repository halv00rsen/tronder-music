import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { mainHover } from '../../utils/constants';
import { SpotifyLink } from '../SpotifyLink';

const AlbumUI = styled.div`
  transition: 0.4s;
  & + & {
    border-top: 1px solid gray;
  }
  padding: 0.5em;
  display: flex;

  &:hover {
    background-color: ${mainHover};
  }
`;

const AlbumImage = styled.img`
  cursor: pointer;
`;

const AlbumInfoUI = styled.div`
  padding: 0.5em;
`;

interface Props {
  album: SpotifyApi.AlbumObjectFull;
}

export const Album = ({ album }: Props) => {
  const history = useHistory();

  const [, , smallImage] = album.images;
  return (
    <AlbumUI>
      <AlbumImage
        onClick={() => history.push(`/album/${album.id}`)}
        src={smallImage.url}
        height={smallImage.height}
        width={smallImage.width}
      />
      <AlbumInfoUI>
        <div>{album.name}</div>
        <div>
          <i>{album.artists.map((artist) => artist.name).join(', ')}</i>
        </div>
        <SpotifyLink externalUrls={album.external_urls} />
      </AlbumInfoUI>
    </AlbumUI>
  );
};
