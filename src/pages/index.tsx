import client from '@/utils/cms/client';
import query from '@/templates/HomePage/query';
import HomePage from '@/templates/HomePage';
import {StrapiHomePage} from '@/templates/HomePage/types';
import {notFound} from 'next/navigation';
import Layout from '@/components/Layout';

export async function getStaticProps() {
  const result = await (await client).querySinglePageProps(query);
  return result;
}

const Page = ({data}: {data: StrapiHomePage | null}) => {
  if (!data) {
    notFound();
  }

  return (
    <Layout>
      <HomePage page={data} />
    </Layout>
  );
};

export default Page;
