import React, { useState } from 'react';
import { PlaylistView } from './PlaylistView';
import { TronderPlaylist } from '../TronderPlaylist';

export const TronderView = () => {
  const [playlistId, setPlaylistId] = useState<string | undefined>(undefined);

  if (playlistId) {
    return (
      <>
        <button onClick={() => setPlaylistId(undefined)}>Back</button>
        <TronderPlaylist playlistId={playlistId} />
      </>
    );
  }

  return (
    <div>
      Check if any of your playlists contain Trønder music. Click your playlist
      to see.
      <PlaylistView playlistClick={setPlaylistId} />
    </div>
  );
};
