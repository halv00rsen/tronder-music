import React from 'react';
import { MyAlbums } from '../components/secure/MyAlbums';
import { PlaylistView } from '../components/secure/view/PlaylistView';
import { ProfileView } from '../components/secure/view/ProfileView';
import { SingleAlbumRouteView } from '../components/secure/view/SingleAlbumRouteView';
import { TronderView } from '../components/secure/view/TronderView';

interface View {
  path: string;
  component: JSX.Element;
  exact?: boolean;
}

interface MenuView extends View {
  friendlyName: string;
}

interface ParamView<T> extends View {
  buildUrl: (params: T) => string;
}

const HOME_VIEW: MenuView = {
  friendlyName: 'Home',
  path: '/',
  component: <div>Welcome to spotify app</div>,
  exact: true,
} as const;

const TRONDER_VIEW: MenuView = {
  friendlyName: 'Trønder',
  path: '/tronder',
  component: <TronderView />,
} as const;

const MY_ALBUMS_VIEW: MenuView = {
  friendlyName: 'My Albums',
  path: '/myalbums',
  component: <MyAlbums />,
} as const;

const PROFILE_VIEW: MenuView = {
  friendlyName: 'Profile',
  path: '/profile',
  component: <ProfileView />,
} as const;

const MY_PLAYLISTS_VIEW: MenuView = {
  friendlyName: 'Your Playlists',
  path: '/playlists',
  component: <PlaylistView />,
} as const;

export const MENU_VIEWS = [
  HOME_VIEW,
  TRONDER_VIEW,
  MY_ALBUMS_VIEW,
  PROFILE_VIEW,
  MY_PLAYLISTS_VIEW,
] as const;

const ALBUM_VIEW: ParamView<{ albumId: string }> = {
  path: '/album/:albumId',
  component: <SingleAlbumRouteView />,
  buildUrl: ({ albumId }) => `/album/${albumId}`,
};

export const VIEWS = [...MENU_VIEWS, ALBUM_VIEW] as const;
