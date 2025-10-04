import {useCallback, useEffect, useRef, useState} from 'react';

// TODO: Scroll duration between mousepad and mouse differs.
// Find a more efficient way of locking the scroll to 1 event
const SCROLL_LOCK_TIMEOUT_IN_SEC = 1;

const useContentScroll = <T extends HTMLElement>(
  callback: (direction: 'up' | 'down') => void,
) => {
  const ref = useRef<T | null>(null);
  const [initiallyScrolled, setInitiallyScrolled] = useState(false);

  const scroll = (direction: 'up' | 'down') => {
    callback(direction);
    setInitiallyScrolled(true);
    const timeout = setTimeout(() => {
      setInitiallyScrolled(false);
      clearTimeout(timeout);
    }, SCROLL_LOCK_TIMEOUT_IN_SEC * 1000);
  };

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const onScroll = (e: WheelEvent) => {
      e.preventDefault();

      if (initiallyScrolled) {
        return;
      }

      if (e.deltaX > 0 || e.deltaY > 0) {
        scroll('up');
        return;
      }

      if (e.deltaX < 0 || e.deltaY < 0) {
        scroll('down');
        return;
      }
    };

    ref.current.addEventListener('wheel', onScroll);

    return () => ref.current?.removeEventListener('wheel', onScroll);
  }, [ref, initiallyScrolled, callback]);

  return ref;
};

export default useContentScroll;
