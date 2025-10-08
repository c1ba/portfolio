import {gql} from '@apollo/client';

export const fragment = gql`
  fragment FormField on ComponentFormField {
    Label
    Type
    HelpText
    Required
    RequiredErrorMessage
    MinLength
    MaxLength
    LaterThan
    EarlierThan
    MoreThan
    LessThan
    Options {
      Label
      RevealOnSelect
    }
  }
`;
