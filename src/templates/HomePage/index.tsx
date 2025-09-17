import GeneralHero from '@/components/Hero/GeneralHero';
import {processStrapiHero} from '@/utils/cms/processors';
import {StrapiHomePage} from './types';
import {mapInnerPages} from '@/helpers/innerPages';

type PageData = {
  page: StrapiHomePage;
};

const HomePage = ({page}: PageData) => {
  const {
    homePage: {Hero, InnerPages},
  } = page;

  return (
    <>
      <GeneralHero {...processStrapiHero(Hero)} />
      {mapInnerPages(InnerPages)}
    </>
  );
};

export default HomePage;
