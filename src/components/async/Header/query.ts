import {gql} from '@apollo/client';

export const query = gql`
  query Header {
    header {
      LinkSections {
        DisplayText
        ScreenreaderText
        URL
        Icon {
          ...Icon
        }
      }
      Socials {
        DisplayText
        Icon {
          ...Icon
        }
        ScreenreaderText
        URL
      }
    }
  }
`;
