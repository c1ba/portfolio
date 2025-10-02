'use client';
import IntersectorObserverWrapper from '@/helpers/IntersectorObserverWrapper';
import styles from './RichText.module.scss';
import React from 'react';

type RichTextProps = {
  id?: string;
  content: string;
  className?: string;
};

const RichText = ({id, content, className, ...props}: RichTextProps) => {
  const classNames = [styles.richText, className].filter(Boolean).join(' ');
  return (
    <IntersectorObserverWrapper>
      {(ref: React.RefObject<HTMLDivElement | null>, inView) => (
        <div
          ref={ref}
          className={`${classNames} ${styles.fadedIn}${inView ? ` ${styles.visible}` : ''}`}
          id={id}
          dangerouslySetInnerHTML={{__html: content}}
          {...props}
        />
      )}
    </IntersectorObserverWrapper>
  );
};

export default RichText;
