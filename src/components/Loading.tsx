import React from 'react';

interface Props {
  loadingMessage?: string;
}

export const Loading = ({ loadingMessage }: Props) => {
  return <div>{loadingMessage ? loadingMessage : 'Loading...'}</div>;
};
