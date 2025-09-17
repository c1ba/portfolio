import {StrapiHero, StrapiInnerPages} from '@/utils/cms/types';

export type StrapiHomePage = {
  homePage: {
    Hero: StrapiHero;
    InnerPages: StrapiInnerPages;
  };
};
