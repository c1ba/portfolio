import {gql} from '@apollo/client';

export const THUMBNAIL = gql`
  fragment StrapiThumbnail on UploadFile {
    alternativeText
    height
    width
    url
  }
`;
