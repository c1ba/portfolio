import {PropsWithChildren} from 'react';
import styles from './GridContainer.module.scss';

type GridContainerProps = PropsWithChildren;

const GridContainer = ({children}: GridContainerProps) => {
  return <div className={`${styles.container}`}>{children}</div>;
};

export default GridContainer;
