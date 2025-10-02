import {StrapiIcon} from '@/utils/cms/types';

export type Section = {
  DisplayText: string;
  ScreenreaderText?: string;
  URL?: string;
  Icon?: StrapiIcon;
};

export type HeaderData = {
  LinkSections: Section[];
  Socials?: Section[];
};
