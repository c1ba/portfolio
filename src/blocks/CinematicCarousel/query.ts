import {gql} from '@apollo/client';

export const fragment = gql`
  fragment CinematicCarousel on ComponentGeneralCinematicCarousel {
    Cards {
      Title
      URL
      BackgroundImage {
        ...StrapiThumbnail
      }
    }
  }
`;
