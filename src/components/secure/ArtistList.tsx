import React from 'react';
import { SpotifyLink } from '../SpotifyLink';

interface Props {
  artists: SpotifyApi.ArtistObjectSimplified[];
}

export const ArtistList = ({ artists }: Props) => {
  return (
    <div>
      <div>Artists</div>
      {artists.map((artist) => {
        return (
          <span key={artist.id}>
            <SpotifyLink
              externalUrls={artist.external_urls}
              customText={artist.name}
            />
          </span>
        );
      })}
    </div>
  );
};
