import '@/app/styles/globals.scss';
import GridContainer from '../Grid/GridContainer';
import BackgroundPattern from '../BackgroundPattern';
import styles from './Layout.module.scss';

const Layout = ({
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
