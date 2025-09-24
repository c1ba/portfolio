import {GeneralHeroProps} from '@/components/Hero/types';
import {StrapiCard, StrapiHero, StrapiIcon, StrapiImage} from './types';
import {HeroWithProfilePictureProps} from '@/components/Hero/HeroWithProfilePicture';
import env from '@/utils/env.mjs';

const NEXT_PUBLIC_CDN_HOST = env.NEXT_PUBLIC_CDN_HOST;

export const processAssetUrl = (url: string | undefined) => {
  return !url ? undefined : `${NEXT_PUBLIC_CDN_HOST}${url}`;
};

export const processStrapiImage = (image: StrapiImage | undefined) =>
  !image?.url
    ? undefined
    : {
        ...image,
        url: processAssetUrl(image.url) as string,
      };

export const processStrapiIcons = (icons: StrapiIcon[]) => {
  return Object.fromEntries(
    icons.map((icon) => {
      return [
        icon.Code,
        {
          label: !!icon.Label ? icon.Label : undefined,
          default: processAssetUrl(icon.Default.url) as string,
          variant: !!icon.Variant
            ? processAssetUrl(icon.Variant.url)
            : processAssetUrl(icon.Default.url),
        },
      ];
    }),
  );
};

export const processStrapiHero = (hero: StrapiHero): GeneralHeroProps => {
  return {
    heading: hero.Heading,
    subheading: hero.Subheading,
    thumbnail: hero.Thumbnail,
    enableWhiteBackground: hero.EnableWhiteBackground,
  };
};

export const processStrapiHeroWithProfilePicture = (
  hero: StrapiHero,
): HeroWithProfilePictureProps => {
  const h = Array.isArray(hero) ? hero[0] : hero;
  const profilePictureUrl = processAssetUrl(h?.Thumbnail?.url);
  return {
    heading: h.Heading,
    subheading: h.Subheading,
    profilePicture:
      h.Thumbnail && profilePictureUrl
        ? {...h.Thumbnail, url: profilePictureUrl}
        : undefined,
  };
};

export const processStrapiCinematicCards = (cards: StrapiCard[]) => {
  return (cards || []).map((card) => ({
    title: card.Title,
    url: card.URL,
    backgroundImage: card.BackgroundImage,
    icons: [],
  }));
};
