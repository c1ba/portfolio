import Grid from '../Grid/Grid';
import GridContainer from '../Grid/GridContainer';
import styles from './BackgroundPattern.module.scss';
import BackgroundShape from '@/assets/Shape.svg';

const BackgroundPattern = () => {
  return (
    <div className={styles.patternContainer}>
      <GridContainer>
        <Grid className={styles.gridPositionFirst}>
          <BackgroundShape />
        </Grid>
        <Grid
          className={`${styles.gridPositionLast} ${styles.flipHorizontal} ${styles.overlap}`}
        >
          <BackgroundShape />
        </Grid>
      </GridContainer>
    </div>
  );
};

export default BackgroundPattern;
