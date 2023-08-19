import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ] as const);

  const handleWindowResize = () => {
    setSize([window.innerWidth, window.innerHeight]);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return size;
};
