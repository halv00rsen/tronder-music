import React, { useEffect, useState } from 'react';
import { useSpotifyState } from '../../context/spotify';
import { isTrackObject } from '../../service/spotify';
import { isTronderTrack } from '../../service/tronder';
import { Loading } from '../Loading';
import styled from 'styled-components';
import { getTrackDuration } from '../../utils/time';
import { SpotifyLink } from '../SpotifyLink';
import { ArtistList } from './ArtistList';

const Track = styled.div`
  padding: 1em;
  margin: 1em;
  border: 1px solid black;
`;

interface DisplayProps {
  playlist: SpotifyApi.SinglePlaylistResponse;
}

const uniq = (tracks: SpotifyApi.TrackObjectFull[]) => {
  const seen: { [key: string]: boolean } = {};
  return tracks.filter((track) => {
    if (seen[track.id]) {
      return false;
    }
    seen[track.id] = true;
    return true;
  });
};

const TronderDisplayer = ({ playlist }: DisplayProps) => {
  const { instance } = useSpotifyState();

  const [tronderTracks, setTronderTracks] = useState<
    SpotifyApi.TrackObjectFull[] | undefined
  >(undefined);

  const loadPlaylistTracks = async () => {
    const maxLimit = 1400;
    const total = playlist.tracks.total;
    const loadTracks = async (offset: number) => {
      const tracks = await instance.getPlaylistTracks(playlist.id, {
        offset: offset,
        limit: playlist.tracks.limit,
      });
      return tracks.items;
    };
    const tracks: SpotifyApi.TrackObjectFull[] = [];
    for (
      let offset = playlist.tracks.offset;
      offset < Math.min(maxLimit, total);
      offset += playlist.tracks.limit
    ) {
      const tronder = await loadTracks(offset);
      tracks.push(
        ...tronder
          .map((obj) => obj.track)
          .filter(isTrackObject)
          .filter(isTronderTrack)
      );
    }
    setTronderTracks(uniq(tracks));
  };

  return (
    <div>
      <div>
        <b>{playlist.name}</b>
      </div>
      <div>{playlist.description}</div>
      {tronderTracks === undefined ? (
        <button onClick={loadPlaylistTracks}>Check content</button>
      ) : (
        <div>
          <div>
            You have {tronderTracks.length} Trønder songs in this playlist
          </div>
          Your Tronder Tracks:
          {tronderTracks.map((track) => {
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
      )}
    </div>
  );
};

interface Props {
  playlistId: string;
}

export const TronderPlaylist = ({ playlistId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { instance } = useSpotifyState();

  const [playlist, setPlaylist] = useState<
    SpotifyApi.SinglePlaylistResponse | undefined
  >(undefined);

  useEffect(() => {
    if (!loading && !error && !playlist) {
      setLoading(true);
      instance
        .getPlaylist(playlistId)
        .then((data) => setPlaylist(data))
        .catch(() => {
          setPlaylist(undefined);
          setError('An error happened while loading your playlist');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [instance, loading, playlistId, error, playlist]);

  if (loading) {
    return <Loading loadingMessage="Loading playlist" />;
  } else if (!playlist) {
    return <div>Could not load your playlist: {error}</div>;
  }
  return <TronderDisplayer playlist={playlist} />;
};
