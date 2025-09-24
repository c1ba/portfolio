import client from '@/utils/cms/client';
import TEMPLATE_MAP, {QUERY_MAP, TemplateType} from '@/utils/cms/mapping';
import {notFound} from 'next/navigation';

export async function generateStaticParams() {
  const urls = await (await client).querySitewideURLs();
  const slugs = urls.map(({url, pageType}) => ({
    slug: url.split('/').filter((slugSec) => !!slugSec),
    pageType,
  }));
  return slugs;
}

const PageGenerator = async ({params}: PageProps<'/[...slug]'>) => {
  const {slug} = await params;
  const pageUrl = `/${slug.join('/')}`;
  const urls = await (await client).querySitewideURLs();
  const pageType = urls.find(({url}) => url === pageUrl)?.pageType;

  if (!pageType) {
    notFound();
  }

  const Template = TEMPLATE_MAP[pageType as TemplateType];
  const query = QUERY_MAP[pageType as TemplateType];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageData = await (await client).queryByURL<any>(pageUrl, query);

  return <Template data={pageData} />;
};

export default PageGenerator;
