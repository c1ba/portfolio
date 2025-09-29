import client from '@/utils/cms/client';
import query from '@/templates/HomePage/query';
import HomePage from '@/templates/HomePage';
import {StrapiHomePage} from '@/templates/HomePage/types';
import {notFound} from 'next/navigation';
import PageWrapper from '@/components/Page';

const Page = async () => {
  const data = await (await client).querySinglePageProps<StrapiHomePage>(query);
  if (!data) {
    notFound();
  }

  return (
    <PageWrapper url="/">
      <HomePage data={data.homePage} />
    </PageWrapper>
  );
};

export default Page;
