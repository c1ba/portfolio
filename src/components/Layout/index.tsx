import '@/app/theme/globals.scss';

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <html lang="en">{children}</html>;
};

export default Layout;
