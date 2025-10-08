import {gql} from '@apollo/client';

export const fragment = gql`
  fragment StrapiContactPage on ContactPage {
    FlexibleContent {
      ...RichText
      ...EmailForm
    }
  }
`;

const query = gql`
  query ContactPages($filters: ContactPageFiltersInput) {
    contactPages(filters: $filters) {
      ...StrapiContactPage
    }
  }
`;

export default query;
