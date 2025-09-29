import {processStrapiHero} from '@/utils/cms/processors';
import {mapInnerPages} from '@/helpers/innerPages';
import ScreenHero from '@/components/Hero/ScreenHero';
import {StrapiHero, StrapiInnerPages} from '@/utils/cms/types';

type PageProps = {
  data: {
    Hero: StrapiHero;
    InnerPages: StrapiInnerPages;
  };
};

const HomePage = ({data}: PageProps) => {
  const {Hero, InnerPages} = data;

  return (
    <>
      <ScreenHero {...processStrapiHero(Hero)} />
      {mapInnerPages(InnerPages)}
    </>
  );
};

export default HomePage;
