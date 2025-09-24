import '@/app/theme/globals.scss';
import GridContainer from '../Grid/GridContainer';
import BackgroundPattern from '../BackgroundPattern';
import styles from './Layout.module.scss';
import client from '@/utils/cms/client';

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <main>
          <GridContainer className={styles.mainGridContainer}>
            {children}
          </GridContainer>
        </main>
        <BackgroundPattern />
      </body>
    </html>
  );
};

export default Layout;
