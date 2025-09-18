import {useEffect, useState} from 'react';

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState<number | undefined>(undefined);

  const onScroll = (_e?: Event) => {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    if (height <= window.innerHeight) {
      return;
    }
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => document.removeEventListener('scroll', onScroll);
  });

  useEffect(() => {
    onScroll();
  }, []);

  return scrollY;
};

export default useScrollPosition;
