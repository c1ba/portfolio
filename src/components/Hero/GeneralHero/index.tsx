import Image from 'next/image';
import styles from './GeneralHero.module.scss';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';
import {ColumnSpan} from '@/app/theme/types';
import React from 'react';
import {ForwardedRef} from '@/utils/types';
import {GeneralHeroProps} from '../types';
import Section from '@/components/Section';

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

const GeneralHero = ({
  heading,
  subheading,
  thumbnail,
  enableWhiteBackground,
  className,
}: GeneralHeroProps) => {
  const sectionClassNames = [
    enableWhiteBackground ? styles.whiteBackground : '',
  ]
    .filter(Boolean)
    .join(' ');

  const gridContentClassNames = [styles.heroContentGrid, className]
    .filter(Boolean)
    .join(' ');
  return (
    <GridItem>
      <Section className={sectionClassNames}>
        <GridContainer>
          <GridItem
            columnSpan={COLUMN_SPAN_CONFIG}
            className={gridContentClassNames}
          >
            <div>
              <h2>{heading}</h2>
              {subheading && (
                <h5>
                  <code>{subheading}</code>
                </h5>
              )}
            </div>
            {thumbnail && (
              <Image
                src={thumbnail.url}
                alt={thumbnail.alternativeText || 'Homepage Banner Thumbnail'}
                width={parseInt(thumbnail.width, 10)}
                height={parseInt(thumbnail.height, 10)}
              />
            )}
          </GridItem>
        </GridContainer>
      </Section>
    </GridItem>
  );
};

export default GeneralHero;
