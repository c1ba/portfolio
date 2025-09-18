import {gql} from '@apollo/client';

export const fragment = gql`
  fragment RichText on ComponentGeneralRichText {
    HtmlId
    Content
  }
`;
