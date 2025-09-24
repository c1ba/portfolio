import {gql} from '@apollo/client';

export const fragment = gql`
  fragment ProjectsList on ComponentGeneralProjectsList {
    DisplayAs
  }
`;
