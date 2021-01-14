import React, { useEffect } from 'react';
import { useSpotifyDispatch, useSpotifyState } from '../../../context/spotify';
import styled from 'styled-components';
import { mainHover } from '../../../utils/constants';

const PlaylistUI = styled.div`
  margin: 1em;
  padding: 0.5em;
  border: 1px solid black;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${mainHover};
  }
`;

type OnClick = (playlistId: string) => void;

interface Props {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  onClick?: OnClick;
}

const Playlist = ({ playlist, onClick }: Props) => {
  return (
    <PlaylistUI onClick={() => onClick?.(playlist.id)}>
      <b>{playlist.name}</b>
      <div>Number of tracks: {playlist.tracks.total}</div>
    </PlaylistUI>
  );
};

interface ViewProps {
  playlistClick?: OnClick;
}

export const PlaylistView = ({ playlistClick }: ViewProps) => {
  const { instance, userPlaylists } = useSpotifyState();
  const dispatch = useSpotifyDispatch();

  useEffect(() => {
    const loadPlaylists = async () => {
      const response = await instance.getUserPlaylists();
      dispatch({
        type: 'set-user-playlists',
        playlists: response,
      });
    };

    if (userPlaylists === undefined) {
      loadPlaylists();
    }
  }, [instance, dispatch, userPlaylists]);

  if (!userPlaylists || !userPlaylists.items.length) {
    return <div>You don&apos;t have any playlists</div>;
  }
  return (
    <div>
      {userPlaylists.items.map((playlist) => (
        <Playlist
          key={playlist.id}
          playlist={playlist}
          onClick={playlistClick}
        />
      ))}
    </div>
  );
};
