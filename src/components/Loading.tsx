import React, { useEffect, useState } from 'react';

interface Props {
  loadingMessage?: string;
}

export const Loading = ({ loadingMessage }: Props) => {
  const [loading, setLoading] = useState('');

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      const str = '.....';
      setLoading(str.substring(0, (counter += 1)));
      counter %= str.length;
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      {loadingMessage ? loadingMessage : 'Loading'}
      {loading}
    </div>
  );
};
