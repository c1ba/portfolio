import {gql} from '@apollo/client';
import {TEMPLATE_TYPES} from './mapping';

export const SITE_URLS = gql`
  query SiteURLs {
    ${TEMPLATE_TYPES.map(
      (templateType) =>
        `${templateType}s {
        URL
        DisablePageGeneration
      }`,
    )}
  }
`;

export const PAGE_METADATA = gql`
  query PageMetadatas($url: String) {
    ${TEMPLATE_TYPES.map(
      (templateType) =>
        `${templateType}s(filters: 
          {
            
            URL: {
              eq: $url
            }
          }) {
          URL
          PageMeta {
            ...PageMetadata
          }
      }`,
    )}
    homePage {
      PageMeta {
        ...PageMetadata
      }
    }
  }
`;

export const PROJECT_METAS = gql`
  query ProjectMetas {
    projectMetas {
      Title
      URL
      Description
      FrontendFramework
      BackendFramework
      APIType
      Database
      BackgroundImage {
        ...StrapiThumbnail
      }
    }
  }
`;

export const ICONS = gql`
  query Icons {
    icons {
      Code
      Label
      Default {
        url
      }
      Variant {
        url
      }
    }
  }
`;
