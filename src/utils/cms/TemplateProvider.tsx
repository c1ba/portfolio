import Layout from '@/components/Layout';
import TEMPLATE_MAP, {TemplateType} from './mapping';

type TemplateProviderProps = {
  pageType: TemplateType;
  data: unknown;
};

const TemplateProvider = ({pageType, data}: TemplateProviderProps) => {
  const Template = TEMPLATE_MAP[pageType as TemplateType];
  return (
    <Layout>
      <Template data={data} />
    </Layout>
  );
};

export default TemplateProvider;
