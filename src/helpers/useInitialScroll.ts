import {useEffect, useState} from 'react';
import useScrollPosition from './useScrollPosition';

const useInitialScroll = () => {
  const [initialScroll, setInitialScroll] = useState<boolean>(false);
  const scrollY = useScrollPosition();

  useEffect(() => {
    if (initialScroll) {
      return;
    }

    if (!scrollY) {
      return;
    }

    setInitialScroll(scrollY > 0);
  }, [initialScroll, scrollY]);

  return initialScroll;
};

export default useInitialScroll;
