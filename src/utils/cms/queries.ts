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
