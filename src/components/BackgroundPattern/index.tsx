import GridItem from '../Grid/GridItem';
import GridContainer from '../Grid/GridContainer';
import styles from './BackgroundPattern.module.scss';
import FadingBackgroundPattern from './FadingBackgroundPattern';

const BackgroundPattern = () => {
  return (
    <div className={styles.patternContainer}>
      <GridContainer>
        <GridItem className={styles.gridPositionFirst}>
          <FadingBackgroundPattern />
        </GridItem>
        <GridItem
          className={`${styles.gridPositionLast} ${styles.flipHorizontal} ${styles.overlap}`}
        >
          <FadingBackgroundPattern />
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default BackgroundPattern;
