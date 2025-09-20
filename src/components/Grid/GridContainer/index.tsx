import {PropsWithChildren} from 'react';
import styles from './GridContainer.module.scss';

type GridContainerProps = PropsWithChildren<{className?: string}>;

const GridContainer = ({className, children}: GridContainerProps) => {
  const classNames = [styles.container, className].filter(Boolean).join(' ');
  return <div className={classNames}>{children}</div>;
};

export default GridContainer;
