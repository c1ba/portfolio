import '@/app/styles/globals.scss';
import GridContainer from '../Grid/GridContainer';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <main>
          <GridContainer>{children}</GridContainer>
        </main>
      </body>
    </html>
  );
};

export default Layout;
