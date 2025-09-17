import AboutPage from '@/templates/AboutPage';
import aboutPageQuery from '@/templates/AboutPage/query';
import ContactPage from '@/templates/ContactPage';

const TEMPLATE_MAP = {
  aboutPage: AboutPage,
  contactPage: ContactPage,
};

export const QUERY_MAP = {
  aboutPage: aboutPageQuery,
  contactPage: aboutPageQuery,
};

export type TemplateType = keyof typeof TEMPLATE_MAP;

export const TEMPLATE_TYPES = Object.keys(TEMPLATE_MAP);

export default TEMPLATE_MAP;
