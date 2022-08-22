import { useState, useEffect } from 'react';

const bpConfig = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Bp = keyof typeof bpConfig;

export const useBreakpoint = (bp: Bp) => {
  const [ge, setGe] = useState(() => window.innerWidth >= bpConfig[bp]);

  useEffect(() => {
    const calcWidth = () => {
      setGe(window.innerWidth >= bpConfig[bp]);
    };
    window.addEventListener('resize', calcWidth);
    return () => window.removeEventListener('resize', calcWidth);
  }, [bp]);

  return ge;
};
