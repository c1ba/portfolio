import {gql} from '@apollo/client';

const query = gql`
  query HomePage {
    homePage {
      Hero {
        ...StrapiHero
      }
      InnerPages {
        ... on ComponentInnerPagesInnerAboutPage {
          about_page {
            URL
            ...StrapiAboutPage
          }
        }
      }
    }
  }
`;

export default query;
