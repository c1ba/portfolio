import Icon from '@/components/Icon/Icon';
import styles from './CardFrame.module.scss';
import React, {PropsWithChildren} from 'react';
import {Icon as IconType} from '@/app/theme/types';

type CardFrameProps = {
  title?: string;
  url?: string;
  icons?: IconType[];
  enableHover?: boolean;
  className?: string;
  enableStartFade?: boolean;
  ref?: React.RefObject<HTMLDivElement | HTMLAnchorElement | null>;
};

const CardFrame = ({
  title,
  url,
  icons,
  enableHover = true,
  className,
  enableStartFade = true,
  ref,
  children,
}: PropsWithChildren<CardFrameProps>) => {
  const classNames = [
    styles.mainCard,
    enableHover ? styles.mainCardHover : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const foregroundClassNames = [
    styles.foreground,
    enableHover ? styles.foregroundHover : '',
  ]
    .filter(Boolean)
    .join(' ');

  const Content = ({
    className,
    contentRef,
  }: {
    className?: string;
    contentRef?: React.RefObject<HTMLDivElement>;
  }) => {
    return (
      <div className={className} ref={contentRef}>
        <div className={styles.glass} />
        {enableStartFade && <div className={styles.cardCover} />}
        {title && <p className={styles.title}>{title}</p>}
        {icons && (
          <div className={styles.iconsContainer}>
            {icons.map((icon, idx) => (
              <Icon key={`${title}-icon-${idx}`} src={icon.default} size="lg" />
            ))}
          </div>
        )}
        <div className={foregroundClassNames} />
        {children}
      </div>
    );
  };
  return url ? (
    <a
      href={url}
      target="_blank"
      className={classNames}
      ref={ref as React.RefObject<HTMLAnchorElement>}
    >
      <Content />
    </a>
  ) : (
    <Content
      className={classNames}
      contentRef={ref as React.RefObject<HTMLDivElement>}
    />
  );
};

export default CardFrame;
