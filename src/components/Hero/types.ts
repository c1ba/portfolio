import {StrapiImage} from '@/utils/cms/types';

export type GeneralHeroProps = {
  heading: string;
  subheading?: string;
  thumbnail?: StrapiImage;
  enableWhiteBackground?: boolean;
  className?: string;
};
