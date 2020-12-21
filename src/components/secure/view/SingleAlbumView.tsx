import React, { useEffect, useState } from 'react';
import { useSpotifyState } from '../../../context/spotify';
import styled from 'styled-components';
import { getTrackDuration } from '../../../utils/time';
import { mainHover } from '../../../utils/constants';

const Header = styled.div`
  padding: 1em;
`;

const TrackHeader = styled.div``;

const Track = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  transition: 0.4s;

  border-top: 1px solid black;

  &:hover {
    background-color: ${mainHover};
  }
`;

interface Props {
  albumId: string;
}

export const SingleAlbumView = ({ albumId }: Props) => {
  const { instance } = useSpotifyState();

  const [album, setAlbum] = useState<
    SpotifyApi.SingleAlbumResponse | undefined
  >(undefined);

  useEffect(() => {
    const loadAlbum = async () => {
      const response = await instance.getAlbum(albumId);
      setAlbum(response);
    };
    loadAlbum();
  }, [albumId, instance]);

  if (album) {
    const [, mediumImage] = album.images;
    return (
      <div>
        <h2>{album.name}</h2>
        <Header>
          <img
            src={mediumImage.url}
            height={mediumImage.height}
            width={mediumImage.width}
          />
        </Header>
        <TrackHeader>Tracks</TrackHeader>
        {album.tracks.items.map((track) => {
          return (
            <Track key={track.id}>
              <span>
                {track.track_number}. {track.name}
              </span>
              <span>{getTrackDuration(track.duration_ms)}</span>
            </Track>
          );
        })}
      </div>
    );
  }
  return null;
};
