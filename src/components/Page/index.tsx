import {PropsWithChildren} from 'react';
import GridContainer from '@/components/Grid/GridContainer';
import BackgroundPattern from '@/components/BackgroundPattern';
import styles from './Page.module.scss';
import PageMetadata from '@/components/PageMetadata';
import Header from '@/components/async/Header';

type PageProps = {
  url?: string;
};

const Page = ({url, children}: PropsWithChildren<PageProps>) => {
  return (
    <>
      <PageMetadata url={url} />
      <body>
        <Header url={url} />
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
