import GridItem from '@/components/Grid/GridItem';
import TEMPLATE_MAP from '@/utils/cms/mapping';
import {StrapiInnerPages} from '@/utils/cms/types';
import {snakeCase} from '@/utils/stringUtils';

export const INNER_TEMPLATE_MAP = Object.fromEntries(
  Object.entries(TEMPLATE_MAP).map(([key, val]) => [snakeCase(key), val]),
);

export const mapInnerPages = (pages: StrapiInnerPages) => {
  return pages.map((page, index) => {
    const [key, data] = Object.entries(page).filter(
      ([key, _value]) => key !== '__typename',
    )[0];
    const Template = INNER_TEMPLATE_MAP[key];
    const templateId = key.replace('_', '-');

    if (!Template) {
      throw new Error('Template not found.');
    }

    return (
      <GridItem key={`${templateId}-${index}`}>
        <section id={templateId}>
          <Template data={data} />
        </section>
      </GridItem>
    );
  });
};
