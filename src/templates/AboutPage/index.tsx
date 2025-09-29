import HeroWithProfilePicture from '@/components/Hero/HeroWithProfilePicture';
import TemplateContainer from '@/components/TemplateContainer';
import mapBlocks from '@/helpers/blocks';
import {processStrapiHeroWithProfilePicture} from '@/utils/cms/processors';
import {StrapiFlexibleContent, StrapiHero} from '@/utils/cms/types';

type PageProps = {
  Hero: StrapiHero;
  FlexibleContent: StrapiFlexibleContent;
};

type AboutPageProps = {
  data: PageProps;
  isInnerPage?: boolean;
  url?: string;
};

const AboutPage = ({data, isInnerPage, url}: AboutPageProps) => {
  const {Hero, FlexibleContent} = data;
  return (
    <TemplateContainer isInnerPage={isInnerPage} url={url}>
      <HeroWithProfilePicture {...processStrapiHeroWithProfilePicture(Hero)} />
      {mapBlocks(FlexibleContent)}
    </TemplateContainer>
  );
};

export default AboutPage;
