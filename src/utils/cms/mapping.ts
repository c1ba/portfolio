import AboutPage from '@/templates/AboutPage';
import aboutPageQuery from '@/templates/AboutPage/query';
import ContactPage from '@/templates/ContactPage';
import {JSX} from 'react';

const MAP_KEYS = ['aboutPage', 'contactPage'] as const;
export type TemplateType = (typeof MAP_KEYS)[number];

const TEMPLATE_MAP: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in TemplateType]: (props: any) => JSX.Element;
} = {
  aboutPage: AboutPage,
  contactPage: ContactPage,
};

export const QUERY_MAP = {
  aboutPage: aboutPageQuery,
  contactPage: aboutPageQuery,
};

export const TEMPLATE_TYPES = Object.keys(TEMPLATE_MAP);

export default TEMPLATE_MAP;
