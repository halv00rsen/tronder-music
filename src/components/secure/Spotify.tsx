import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Album } from './Album';
import styled from 'styled-components';
import { useSpotifyDispatch, useSpotifyState } from '../../context/spotify';

const Card = styled.div`
  border: 1px solid transparent;
  padding: 1em;
`;

interface Props {
  spotify: SpotifyWebApi.SpotifyWebApiJs;
}

export const Spotify = ({ spotify }: Props) => {
  const state = useSpotifyState();
  const dispatch = useSpotifyDispatch();

  const [albums, setAlbums] = useState<SpotifyApi.SavedAlbumObject[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAlbums = async () => {
      setLoading(true);
      const response = await spotify.getMySavedAlbums({
        offset,
      });
      setLoading(false);
      setAlbums(response.items);
      setTotal(response.total);
      console.log(response);
    };
    loadAlbums();
  }, [offset, spotify]);

  const nextAlbums = () => {
    setOffset(Math.min(offset + 20, total));
  };

  const lastAlbums = () => {
    setOffset(Math.max(0, offset - 20));
  };

  return (
    <Card>
      <h4>Your albums</h4>
      {loading ? (
        <div>Loading albums...</div>
      ) : (
        state.savedAlbums.map((album) => {
          return <Album album={album.album} key={album.album.id} />;
        })
      )}
      <button onClick={lastAlbums} disabled={loading || offset - 20 < 0}>
        Back
      </button>
      <button onClick={nextAlbums} disabled={loading || offset + 20 >= total}>
        Next
      </button>
    </Card>
  );
};
