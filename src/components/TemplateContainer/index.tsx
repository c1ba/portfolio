import {PropsWithChildren} from 'react';
import GridContainer from '@/components/Grid/GridContainer';
import BackgroundPattern from '@/components/BackgroundPattern';
import styles from './TemplateContainer.module.scss';
import PageMetadata from '../PageMetadata';

type TemplateContainerProps = {
  isInnerPage?: boolean;
  url?: string;
};

const TemplateContainer = ({
  isInnerPage,
  url,
  children,
}: PropsWithChildren<TemplateContainerProps>) => {
  return !isInnerPage ? (
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
  ) : (
    <>{children}</>
  );
};

export default TemplateContainer;
