import GeneralHero from '@/components/Hero/GeneralHero';
import {processStrapiHero} from '@/utils/cms/processors';
import {StrapiHomePage} from './types';
import {mapInnerPages} from '@/helpers/innerPages';
import ScreenHero from '@/components/Hero/ScreenHero';

type PageData = {
  page: StrapiHomePage;
};

const HomePage = ({page}: PageData) => {
  const {
    homePage: {Hero, InnerPages},
  } = page;

  return (
    <>
      <ScreenHero {...processStrapiHero(Hero)} />
      {mapInnerPages(InnerPages)}
    </>
  );
};

export default HomePage;
