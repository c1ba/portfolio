import {GeneralHeroProps} from '@/components/Hero/types';
import {StrapiHero} from './types';
import {HeroWithProfilePictureProps} from '@/components/Hero/HeroWithProfilePicture';
import env from '@/utils/env.mjs';

const NEXT_PUBLIC_CDN_HOST = env.NEXT_PUBLIC_CDN_HOST;

export const processStrapiHero = (hero: StrapiHero): GeneralHeroProps => {
  return {
    heading: hero.Heading,
    subheading: hero.Subheading,
    thumbnail: hero.Thumbnail,
    enableWhiteBackground: hero.EnableWhiteBackground,
  };
};

export const processStrapiHeroWithProfilePicture = (
  hero: StrapiHero | [StrapiHero],
): HeroWithProfilePictureProps => {
  const h = Array.isArray(hero) ? hero[0] : hero;
  return {
    heading: h.Heading,
    subheading: h.Subheading,
    profilePicture: h.Thumbnail
      ? {...h.Thumbnail, url: `${NEXT_PUBLIC_CDN_HOST}${h.Thumbnail.url}`}
      : undefined,
  };
};
