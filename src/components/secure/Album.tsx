import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const AlbumUI = styled.div`
  transition: 0.4s;
  & + & {
    border-top: 1px solid gray;
  }
  padding: 0.5em;
  display: flex;

  &:hover {
    background-color: #e2e2e2;
  }
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
    <AlbumUI onClick={() => history.push(`/album/${album.id}`)}>
      <img
        src={smallImage.url}
        height={smallImage.height}
        width={smallImage.width}
      />
      <AlbumInfoUI>
        <div>{album.name}</div>
        <div>
          <i>{album.artists.map((artist) => artist.name).join(', ')}</i>
        </div>
      </AlbumInfoUI>
    </AlbumUI>
  );
};
