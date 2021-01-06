import React, { useState } from 'react';
import { useSpotifyState } from '../../../context/spotify';
import { SpotifyLink } from '../../SpotifyLink';
import { ArtistList } from '../ArtistList';
import styled from 'styled-components';
import { getTrackDuration } from '../../../utils/time';

const Track = styled.div`
  padding: 1em;
  margin: 1em;
  border: 1px solid black;
`;

const tronderArtists = [
  'åge aleksandersen',
  'hans rotmo',
  'anders jektvik',
  'dde',
  'd.d.e',
  'bjarne brøndbo',
  'terje tysland',
  "travellin' strawberries",
  'the kids',
  'tnt',
  'dumdum boys',
  'astrid s',
  'astrid smedplass',
  'vømmøl',
  'chand torsvik',
  'nordans',
  'gluntan',
  'too far gone',
  'guttelim',
  'hærmætti tysland band',
  'sie gubba',
  'highliners',
  'askil holm',
  'thomas brøndbo',
  'arve tellefsen',
  'dag ingebrigsten',
  'prudence',
  'knutsen & ludvigsen',
  'leidulf hafsmo',
  'otto nielsen',
  'alf skille',
  'four jets',
  'paul okkenhaug',
  'sjuende far i huset',
];

const isTronderTrack = (track: SpotifyApi.PlayHistoryObject): boolean => {
  return track.track.artists.some((artist) => {
    return tronderArtists.some((tronder) =>
      artist.name.toLocaleLowerCase().includes(tronder)
    );
  });
};

const uniq = (tracks: SpotifyApi.PlayHistoryObject[]) => {
  const seen: { [key: string]: boolean } = {};
  return tracks.filter((track) => {
    if (seen[track.track.id]) {
      return false;
    }
    seen[track.track.id] = true;
    return true;
  });
};

export const TronderView = () => {
  const { instance } = useSpotifyState();

  const [tracks, setTracks] = useState<SpotifyApi.PlayHistoryObject[]>([]);

  const calculate = async () => {
    const response = await instance.getMyRecentlyPlayedTracks({
      limit: 50,
    });

    const tronderTracks = response.items.filter(isTronderTrack);
    setTracks(uniq(tronderTracks));
  };

  return (
    <div>
      Have you listened to any Trønder music lately?
      <button onClick={calculate}>Lets find out!</button>
      <div>Num tronder tracks: {tracks.length}</div>
      {tracks
        .map((track) => track.track)
        .map((track) => {
          return (
            <Track key={track.id}>
              <div>
                {track.name} - {getTrackDuration(track.duration_ms)}
              </div>
              <SpotifyLink
                externalUrls={track.external_urls}
                customText={`Listen to "${track.name}" on Spotify`}
              />
              <ArtistList artists={track.artists} />
            </Track>
          );
        })}
    </div>
  );
};
