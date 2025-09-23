export type TemplateURLs = {
  [key: string]: {
    URL: string;
    DisablePageGeneration?: boolean;
    __typename: string;
  }[];
};

export type StrapiImage = {
  height: string;
  width: string;
  url: string;
  alternativeText: string;
};

export type StrapiHero = {
  Heading: string;
  Subheading?: string;
  Thumbnail?: StrapiImage;
  EnableWhiteBackground?: boolean;
};

export type StrapiCard = {
  Title: string;
  URL: string;
  BackgroundImage: StrapiImage;
};

const STRAPI_INNER_PAGES = ['about_page', 'contact_page'] as const;
type StrapiInnerPageKey = (typeof STRAPI_INNER_PAGES)[number];

export type StrapiInnerPages = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in StrapiInnerPageKey]: any;
}[];

export type StrapiFlexibleContent = {
  __typename: string;
  [key: string]: unknown;
}[];
