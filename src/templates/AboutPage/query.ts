import {gql} from '@apollo/client';

export const fragment = gql`
  fragment StrapiAboutPage on AboutPage {
    Hero {
      ...StrapiHero
    }
    FlexibleContent {
      ... on ComponentGeneralRichText {
        HtmlId
        Content
      }
      ... on ComponentGeneralCinematicCarousel {
        Cards {
          Title
          URL
          cta {
            Label
            ScreenreaderText
            Type
            URL
          }
          BackgroundImage {
            alternativeText
            width
            height
            url
          }
        }
      }
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
