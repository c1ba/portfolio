'use client';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import {StrapiImage} from '@/utils/cms/types';
import {useState} from 'react';
import styles from './CinematicCarousel.module.scss';
import animations from './CarouselAnimations.module.scss';
import ImageCard from '@/components/CinematicCard/ImageCard';
import FakeCard from '@/components/CinematicCard/FakeCard';
import IntersectorObserverWrapper from '@/helpers/IntersectorObserverWrapper';

const ANIMATION_TIME_IN_SECONDS = 0.7;

const TRANSITION_TIME = ANIMATION_TIME_IN_SECONDS * 1000;

type ImageCard = {
  title: string;
  url?: string;
  backgroundImage?: StrapiImage;
  icons?: {default: string; variant?: string}[];
};

type CinematicCardsProps = {
  cards: ImageCard[];
};

const CinematicCarousel = ({cards}: CinematicCardsProps) => {
  const [currentCardIdx, setCardIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'Left' | 'Right' | undefined>(
    undefined,
  );

  const setNextCard = (index: number) => {
    setIsTransitioning(true);
    setDirection(
      index > currentCardIdx
        ? 'Right'
        : index < currentCardIdx
          ? 'Left'
          : undefined,
    );

    const transitionFinish = setTimeout(() => {
      setIsTransitioning(false);
      setDirection(undefined);
      setCardIdx(index);
      clearTimeout(transitionFinish);
    }, TRANSITION_TIME);
  };

  return !cards.length ? (
    <></>
  ) : (
    <div className={styles.carouselContainer}>
      <div className={`${styles.center}`}>
        <GridContainer className={styles.cardsGridContainer}>
          {/* Main Card */}
          <GridItem
            className={`${styles.gridRowMid} ${animations.zIndex4} ${styles.center} ${
              isTransitioning ? animations.setZIndex3 : ''
            }`}
          >
            {cards
              .filter((_, idx) => idx === currentCardIdx)
              .map((card, index) => {
                return (
                  <IntersectorObserverWrapper
                    threshold={0.5}
                    key={`card-${index}`}
                  >
                    {(
                      ref: React.RefObject<
                        HTMLAnchorElement | HTMLDivElement | null
                      >,
                      inView,
                    ) => (
                      <ImageCard
                        ref={ref}
                        title={card.title}
                        url={card.url}
                        backgroundImage={card.backgroundImage}
                        icons={card.icons}
                        className={`${
                          isTransitioning
                            ? animations[`slideOut${direction}4`]
                            : ''
                        } ${styles.fadedIn}${inView ? ` ${styles.visible}` : ''}`}
                        enableStartFade={!isTransitioning}
                      />
                    )}
                  </IntersectorObserverWrapper>
                );
              })}
          </GridItem>
          {/* Level 1 Fake cards */}
          <GridItem
            className={`${styles.gridRow2} ${animations.zIndex2} ${styles.setLeft} ${
              isTransitioning && direction === 'Left'
                ? animations.setZIndex3
                : ''
            }`}
            columnSpan={{
              desktop: {range: [4, 4]},
              tabletLandscape: {range: 1, symmetric: true},
            }}
          >
            <IntersectorObserverWrapper threshold={0.5}>
              {(
                ref: React.RefObject<HTMLAnchorElement | HTMLDivElement | null>,
                inView,
              ) => (
                <FakeCard
                  ref={ref}
                  size={0.75}
                  className={`${
                    isTransitioning && direction
                      ? direction === 'Left'
                        ? animations[`slideIn${direction}3`]
                        : animations[`slideOut${direction}3`]
                      : ''
                  } ${styles.fadedIn05}${inView ? ` ${styles.visible}` : ''}`}
                />
              )}
            </IntersectorObserverWrapper>
          </GridItem>
          <GridItem
            className={`${styles.gridRow4} ${animations.zIndex2} ${styles.setRight} ${
              isTransitioning && direction === 'Right'
                ? animations.setZIndex3
                : ''
            }`}
            columnSpan={{
              desktop: {range: [6, 6]},
              tabletLandscape: {range: 1, symmetric: true},
            }}
          >
            <IntersectorObserverWrapper threshold={0.5}>
              {(
                ref: React.RefObject<HTMLAnchorElement | HTMLDivElement | null>,
                inView,
              ) => (
                <FakeCard
                  ref={ref}
                  size={0.75}
                  className={`${
                    isTransitioning && direction
                      ? direction === 'Right'
                        ? animations[`slideIn${direction}3`]
                        : animations[`slideOut${direction}3`]
                      : ''
                  } ${styles.fadedIn05}${inView ? ` ${styles.visible}` : ''}`}
                />
              )}
            </IntersectorObserverWrapper>
          </GridItem>
          {/* Level 2 Fake cards */}
          <GridItem
            className={`${styles.gridRow1} ${animations.zIndex1} ${styles.setLeft} ${
              isTransitioning && direction === 'Left'
                ? animations.setZIndex2
                : ''
            }`}
            columnSpan={{
              desktop: {range: [2, 5]},
              tabletLandscape: {range: 1, symmetric: true},
            }}
          >
            <IntersectorObserverWrapper threshold={0.5}>
              {(
                ref: React.RefObject<HTMLAnchorElement | HTMLDivElement | null>,
                inView,
              ) => (
                <FakeCard
                  ref={ref}
                  size={0.5}
                  className={`${
                    isTransitioning && direction
                      ? direction === 'Left'
                        ? animations[`slideIn${direction}2`]
                        : animations[`slideOut${direction}2`]
                      : ''
                  } ${styles.fadedIn07}${inView ? ` ${styles.visible}` : ''}`}
                />
              )}
            </IntersectorObserverWrapper>
          </GridItem>
          <GridItem
            className={`${styles.gridRow5} ${animations.zIndex1} ${styles.setRight} ${
              isTransitioning && direction === 'Right'
                ? animations.setZIndex2
                : ''
            }`}
            columnSpan={{
              desktop: {range: [5, 8]},
              tabletLandscape: {range: 1, symmetric: true},
            }}
          >
            <IntersectorObserverWrapper threshold={0.5}>
              {(
                ref: React.RefObject<HTMLAnchorElement | HTMLDivElement | null>,
                inView,
              ) => (
                <FakeCard
                  ref={ref}
                  size={0.5}
                  className={`${
                    isTransitioning && direction
                      ? direction === 'Right'
                        ? animations[`slideIn${direction}2`]
                        : animations[`slideOut${direction}2`]
                      : ''
                  } ${styles.fadedIn07}${inView ? ` ${styles.visible}` : ''}`}
                />
              )}
            </IntersectorObserverWrapper>
          </GridItem>
          {/* Level 3 Fake Card */}
          <GridItem
            className={`${styles.gridRowMid} ${animations.zIndex0} ${styles.center} ${
              isTransitioning ? animations.setZIndex1 : undefined
            }`}
          >
            <IntersectorObserverWrapper threshold={1}>
              {(
                ref: React.RefObject<HTMLAnchorElement | HTMLDivElement | null>,
                inView,
              ) => (
                <FakeCard
                  ref={ref}
                  size={0.5}
                  className={`${
                    isTransitioning
                      ? animations[
                          `backCardAnim${direction === 'Right' ? 'Left' : 'Right'}`
                        ]
                      : ''
                  } ${styles.fadedIn07}${inView ? ` ${styles.visible}` : ''}`}
                />
              )}
            </IntersectorObserverWrapper>
          </GridItem>
        </GridContainer>
      </div>
      <div className={`${styles.center} ${styles.buttonContainer}`}>
        {new Array(cards.length).fill(0).map((_, idx) => {
          return (
            <button
              key={`btn-${idx}`}
              type="button"
              className={`${styles.cardButton}${idx === currentCardIdx ? ` ${styles.buttonActive}` : ``}`}
              onClick={() => setNextCard(idx)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default CinematicCarousel;
