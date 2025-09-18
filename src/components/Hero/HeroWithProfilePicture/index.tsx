import Grid from '@/components/Grid/Grid';
import GridContainer from '@/components/Grid/GridContainer';
import {ColumnSpan} from '@/app/styles/types';
import {StrapiImage} from '@/utils/cms/types';
import Image from 'next/image';
import styles from './HeroWithProfilePicture.module.scss';
import PictureFrame from './PictureFrame';

export type HeroWithProfilePictureProps = {
  heading: string;
  subheading?: string;
  profilePicture?: StrapiImage;
};

const COLUMN_SPAN_CONFIG: ColumnSpan = {
  desktop: {
    range: 3,
    symmetric: true,
  },
  tabletLandscape: {
    range: 2,
    symmetric: true,
  },
  tabletPortrait: {
    range: 2,
    symmetric: true,
  },
};

const HeroWithProfilePicture = ({
  heading,
  subheading,
  profilePicture,
}: HeroWithProfilePictureProps) => {
  return (
    <Grid>
      <section className={styles.heroContainer}>
        <GridContainer>
          <Grid columnSpan={COLUMN_SPAN_CONFIG}>
            <div className={styles.headingContainer}>
              <h2>{heading}</h2>
              {profilePicture && <PictureFrame image={profilePicture} />}
            </div>
            {subheading && <p>{subheading}</p>}
          </Grid>
        </GridContainer>
      </section>
    </Grid>
  );
};

export default HeroWithProfilePicture;
