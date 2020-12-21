import React from 'react';
import { useParams } from 'react-router-dom';
import { SingleAlbumView } from './SingleAlbumView';

interface RouteParams {
  albumId: string;
}

export const SingleAlbumRouteView = () => {
  const { albumId } = useParams<RouteParams>();
  return <SingleAlbumView albumId={albumId} />;
};
