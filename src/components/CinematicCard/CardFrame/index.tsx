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
};

const CardFrame = ({
  title,
  url,
  icons,
  enableHover = true,
  className,
  enableStartFade = true,
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

  const Content = ({className}: {className?: string}) => {
    return (
      <div className={className}>
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
    <a href={url} target="_blank" className={classNames}>
      <Content />
    </a>
  ) : (
    <Content className={classNames} />
  );
};

export default CardFrame;
