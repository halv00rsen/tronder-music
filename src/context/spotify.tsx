import SpotifyWebApi from 'spotify-web-api-js';
import { createStore } from './state';

interface SetSavedAlbumsAction {
  type: 'set-saved-albums';
  albums: SpotifyApi.SavedAlbumObject[];
}

interface SetSpotifyInstanceAction {
  type: 'set-spotify-instance';
  spotify: SpotifyWebApi.SpotifyWebApiJs;
}

interface SetProfileAction {
  type: 'set-profile';
  profile: SpotifyApi.CurrentUsersProfileResponse;
}

interface SetUserPlaylistsAction {
  type: 'set-user-playlists';
  playlists: SpotifyApi.ListOfUsersPlaylistsResponse;
}

type Action =
  | SetSavedAlbumsAction
  | SetSpotifyInstanceAction
  | SetUserPlaylistsAction
  | SetProfileAction;

interface State {
  savedAlbums: SpotifyApi.SavedAlbumObject[];
  instance: SpotifyWebApi.SpotifyWebApiJs;
  profile?: SpotifyApi.CurrentUsersProfileResponse;
  userPlaylists?: SpotifyApi.ListOfUsersPlaylistsResponse;
}

const initialState: State = {
  savedAlbums: [],
  instance: new SpotifyWebApi(),
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-saved-albums': {
      return {
        ...state,
        savedAlbums: action.albums,
      };
    }
    case 'set-spotify-instance': {
      return {
        ...state,
        instance: action.spotify,
      };
    }
    case 'set-profile': {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case 'set-user-playlists': {
      return {
        ...state,
        userPlaylists: action.playlists,
      };
    }
    default: {
      return state;
    }
  }
};

interface StrictState extends State {
  profile: SpotifyApi.CurrentUsersProfileResponse;
}

const isStrictState = (state: State): state is StrictState => {
  return !!state.profile;
};

const store = createStore({ initialState, reducer, name: 'spotify' });

export const SpotifyStateProvider = store.provider;

export const useSpotifyState = store.useState;

export const useStrictSpotifyState = (): StrictState => {
  const state = useSpotifyState();
  if (!isStrictState(state)) {
    throw new Error('State is currently not strict.');
  }
  return state;
};

export const useSpotifyDispatch = store.useDispatch;

export type SpotifyDispatch = ReturnType<typeof useSpotifyDispatch>;
