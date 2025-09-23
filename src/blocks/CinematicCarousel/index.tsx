import {COLUMN_SPAN_CONFIG} from '@/app/styles/common';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import {StrapiImage} from '@/utils/cms/types';
import ImageCard from '@/components/CinematicCard/ImageCard';
import CinematicCarouselComponent from '@/components/CinematicCarousel';
import {processStrapiCinematicCards} from '@/utils/cms/processors';

type ImageCard = {
  Title: string;
  URL: string;
  BackgroundImage: StrapiImage;
};

type CinematicCardsProps = {
  Cards: ImageCard[];
};

const CinematicCarousel = ({Cards}: CinematicCardsProps) => {
  const processedCards = processStrapiCinematicCards(Cards);
  return (
    <GridItem>
      <GridContainer>
        <GridItem columnSpan={COLUMN_SPAN_CONFIG}>
          <CinematicCarouselComponent cards={processedCards} />
        </GridItem>
      </GridContainer>
    </GridItem>
  );
};

export default CinematicCarousel;
