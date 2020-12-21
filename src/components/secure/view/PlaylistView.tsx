import React, { useEffect } from 'react';
import { useSpotifyDispatch, useSpotifyState } from '../../../context/spotify';

export const PlaylistView = () => {
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
      {userPlaylists.items.map((playlist) => {
        return <div key={playlist.id}>{playlist.name}</div>;
      })}
    </div>
  );
};
