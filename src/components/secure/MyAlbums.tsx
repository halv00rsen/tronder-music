import React, { useEffect, useState } from 'react';
import { useSpotifyDispatch, useSpotifyState } from '../../context/spotify';
import { Album } from './Album';

export const MyAlbums = () => {
  const { instance, savedAlbums } = useSpotifyState();
  const dispatch = useSpotifyDispatch();
  const [fetching, setFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const loadAlbums = async () => {
      const response = await instance.getMySavedAlbums();
      dispatch({
        type: 'set-saved-albums',
        albums: response.items,
      });
      setFetching(false);
    };
    if (!savedAlbums.length && !fetching && !hasFetched) {
      setFetching(true);
      setHasFetched(true);
      loadAlbums();
    }
  }, [dispatch, instance, savedAlbums, fetching, hasFetched]);

  return (
    <div>
      {fetching
        ? 'Loading albums...'
        : savedAlbums.map((album) => {
            return <Album album={album.album} key={album.album.id} />;
          })}
    </div>
  );
};
