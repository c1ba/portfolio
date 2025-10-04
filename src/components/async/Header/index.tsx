import client from '@/utils/cms/client';
import {query} from './query';
import {HeaderData} from './types';
import {processStrapiIcon} from '@/utils/cms/processors';
import HeaderComponent from '@/components/Header';

type HeaderProps = {
  url?: string;
};

const Header = async ({url}: HeaderProps) => {
  const data = await (
    await client
  ).querySinglePageProps<{header: HeaderData}>(query);

  if (!data) {
    return <></>;
  }

  const {header} = data;
  const processedData = {
    sections: header.LinkSections.map(
      ({DisplayText, ScreenreaderText, URL, Icon}) => ({
        displayText: DisplayText,
        screenreaderText: ScreenreaderText || undefined,
        url: URL || undefined,
        icon: Icon ? processStrapiIcon(Icon) : undefined,
      }),
    ),
    socials: (header.Socials || []).map(
      ({DisplayText, ScreenreaderText, URL, Icon}) => ({
        displayText: DisplayText,
        screenreaderText: ScreenreaderText || undefined,
        url: URL || undefined,
        icon: Icon ? processStrapiIcon(Icon) : undefined,
      }),
    ),
  };

  return <HeaderComponent {...processedData} revealOnPageEnter={url !== '/'} />;
};

export default Header;
