import { useEffect, useState } from 'react';

export const smallScreenSize = 550;

type Size = { height: number; width: number };

export const useScreenSize = () => {
  const [size, setSize] = useState<Size>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

export const useIsSmallScreen = () => {
  const { width } = useScreenSize();

  return width <= smallScreenSize;
};
