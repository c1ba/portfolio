import {GeneralHeroProps} from '@/components/Hero/GeneralHero';
import {StrapiHero} from './types';
import {HeroWithProfilePictureProps} from '@/components/Hero/HeroWithProfilePicture';

export const processStrapiHero = (hero: StrapiHero): GeneralHeroProps => {
  return {
    heading: hero.Heading,
    subheading: hero.Subheading,
    thumbnail: hero.Thumbnail,
  };
};

export const processStrapiHeroWithProfilePicture = (
  hero: StrapiHero | [StrapiHero],
): HeroWithProfilePictureProps => {
  const h = Array.isArray(hero) ? hero[0] : hero;
  return {
    heading: h.Heading,
    subheading: h.Subheading,
    profilePicture: h.Thumbnail,
  };
};
