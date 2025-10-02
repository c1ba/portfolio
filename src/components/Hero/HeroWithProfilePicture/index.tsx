import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';
import {ColumnSpan} from '@/app/theme/types';
import {StrapiImage} from '@/utils/cms/types';
import styles from './HeroWithProfilePicture.module.scss';
import PictureFrame from './PictureFrame';
import RichText from '@/components/async/RichText';
import Section from '@/components/Section';

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
    <GridItem>
      <Section className={styles.heroContainer}>
        <GridContainer>
          <GridItem columnSpan={COLUMN_SPAN_CONFIG}>
            <GridContainer>
              {profilePicture && (
                <GridItem
                  columnSpan={{
                    desktop: {range: [8, 9]},
                    tabletLandscape: {range: [7, 8]},
                    tabletPortrait: {range: [4, 5]},
                    mobile: {range: [3, 4]},
                  }}
                >
                  <PictureFrame
                    image={profilePicture}
                    className={styles.profilePicture}
                  />
                </GridItem>
              )}
              <GridItem
                columnSpan={{desktop: {range: 7}, tabletLandscape: {range: 6}}}
              >
                <h2 className={styles.heading}>{heading}</h2>
              </GridItem>
              {subheading && (
                <GridItem
                  columnSpan={{
                    desktop: {range: 7},
                    tabletLandscape: {range: 6},
                  }}
                >
                  <RichText content={subheading} />
                </GridItem>
              )}
            </GridContainer>
          </GridItem>
        </GridContainer>
      </Section>
    </GridItem>
  );
};

export default HeroWithProfilePicture;
