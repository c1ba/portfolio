import {PropsWithChildren} from 'react';
import GridContainer from '@/components/Grid/GridContainer';
import BackgroundPattern from '@/components/BackgroundPattern';
import styles from './Page.module.scss';
import PageMetadata from '../PageMetadata';

type PageProps = {
  url?: string;
};

const Page = ({url, children}: PropsWithChildren<PageProps>) => {
  return (
    <>
      <PageMetadata url={url} />
      <body>
        <main>
          <GridContainer className={styles.mainGridContainer}>
            {children}
          </GridContainer>
        </main>
        <BackgroundPattern />
      </body>
    </>
  );
};

export default Page;
