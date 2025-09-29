import {gql} from '@apollo/client';

export const THUMBNAIL = gql`
  fragment StrapiThumbnail on UploadFile {
    alternativeText
    height
    width
    url
  }
`;

export const PAGE_METADATA = gql`
  fragment PageMetadata on ComponentSeoPageMeta {
    Title
    Description
    Robots
    CanonicalTag
    OgTitle
    OgUrl
    OgDescription
    OgType
    OgImage {
      ...StrapiThumbnail
    }
  }
`;
