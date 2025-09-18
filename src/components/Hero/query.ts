import {gql} from '@apollo/client';

export const fragment = gql`
  fragment StrapiHero on ComponentGeneralHero {
    Heading
    Subheading
    Thumbnail {
      ...StrapiThumbnail
    }
    IsProfilePicture
    EnableWhiteBackground
  }
`;
