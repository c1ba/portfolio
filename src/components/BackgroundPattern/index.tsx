import GridItem from '../Grid/GridItem';
import GridContainer from '../Grid/GridContainer';
import styles from './BackgroundPattern.module.scss';
import BackgroundShape from '@/assets/Shape.svg';

const BackgroundPattern = () => {
  return (
    <div className={styles.patternContainer}>
      <GridContainer>
        <GridItem className={styles.gridPositionFirst}>
          <BackgroundShape />
        </GridItem>
        <GridItem
          className={`${styles.gridPositionLast} ${styles.flipHorizontal} ${styles.overlap}`}
        >
          <BackgroundShape />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default BackgroundPattern;
