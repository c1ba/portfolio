import HeroWithProfilePicture from '@/components/Hero/HeroWithProfilePicture';
import mapBlocks from '@/helpers/blocks';
import {processStrapiHeroWithProfilePicture} from '@/utils/cms/processors';
import {StrapiFlexibleContent, StrapiHero} from '@/utils/cms/types';

type PageProps = {
  Hero: StrapiHero;
  FlexibleContent: StrapiFlexibleContent;
};

const AboutPage = ({data}: {data: PageProps}) => {
  const {Hero, FlexibleContent} = data;
  return (
    <>
      <HeroWithProfilePicture {...processStrapiHeroWithProfilePicture(Hero)} />
      {mapBlocks(FlexibleContent)}
    </>
  );
};

export default AboutPage;
