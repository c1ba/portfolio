import {useEffect, useState} from 'react';

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState<number | undefined>(undefined);

  const onScroll = (_e?: Event, container?: HTMLElement) => {
    if (!container) {
      console.error('Container not defined.');
      return;
    }
    const html = document.documentElement;
    const height = Math.max(
      container.scrollHeight,
      container.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    if (height <= window.innerHeight) {
      return;
    }
    setScrollY(container.scrollHeight);
  };

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) {
      console.error('No main element found.');
      return;
    }

    const scrollEvent = (e: Event) => {
      onScroll(e, main);
    };
    main.addEventListener('scroll', scrollEvent);

    return () => main.removeEventListener('scroll', scrollEvent);
  });

  return scrollY;
};

export default useScrollPosition;
