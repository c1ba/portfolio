import LayoutComponent from '@/components/Layout';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <LayoutComponent>{children}</LayoutComponent>;
};

export default Layout;
