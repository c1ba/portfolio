import {gql} from '@apollo/client';

export const fragment = gql`
  fragment StrapiAboutPage on AboutPage {
    Hero {
      ...StrapiHero
    }
    FlexibleContent {
      ...CinematicCarousel
      ...RichText
    }
  }
`;

const query = gql`
  query AboutPages($filters: AboutPageFiltersInput) {
    aboutPages(filters: $filters) {
      ...StrapiAboutPage
    }
  }
`;

export default query;
