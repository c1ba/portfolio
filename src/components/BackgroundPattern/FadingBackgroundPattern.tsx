'use client';
import styles from './BackgroundPattern.module.scss';
import BackgroundShape from '@/assets/Shape.svg';
import IntersectorObserverWrapper from '@/helpers/IntersectorObserverWrapper';
import useInitialScroll from '@/helpers/useInitialScroll';
import React from 'react';

const FadingBackgroundPattern = () => {
  const initialScroll = useInitialScroll();
  return !initialScroll ? (
    <></>
  ) : (
    <IntersectorObserverWrapper threshold={0.32}>
      {(ref: React.RefObject<SVGSVGElement | null>, inView) => (
        <BackgroundShape
          ref={ref}
          className={`${styles.fadedIn1}${inView ? ` ${styles.visible}` : ''}`}
        />
      )}
    </IntersectorObserverWrapper>
  );
};

export default FadingBackgroundPattern;
