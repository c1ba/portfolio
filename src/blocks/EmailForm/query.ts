import {gql} from '@apollo/client';

export const fragment = gql`
  fragment EmailForm on ComponentFormEMailForm {
    Destination
    EmailTemplate {
      Fields {
        ...FormField
      }
    }
  }
`;
