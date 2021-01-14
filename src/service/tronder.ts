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

const isPlayHistoryObject = (
  track: SpotifyApi.PlayHistoryObject | SpotifyApi.TrackObjectFull
): track is SpotifyApi.PlayHistoryObject => {
  return typeof (track as SpotifyApi.PlayHistoryObject).track === 'object';
};

export const isTronderTrack = (
  track: SpotifyApi.PlayHistoryObject | SpotifyApi.TrackObjectFull
): boolean => {
  let artists: string[] = [];
  if (isPlayHistoryObject(track)) {
    artists = track.track.artists.map((artist) => artist.name);
  } else {
    artists = track.artists.map((artist) => artist.name);
  }
  return artists.some((artist) => {
    return tronderArtists.some((tronder) =>
      artist.toLocaleLowerCase().includes(tronder)
    );
  });
};

export const uniqTrack = (tracks: SpotifyApi.PlayHistoryObject[]) => {
  const seen: { [key: string]: boolean } = {};
  return tracks.filter((track) => {
    if (seen[track.track.id]) {
      return false;
    }
    seen[track.track.id] = true;
    return true;
  });
};
