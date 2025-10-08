import mapBlocks from '@/helpers/blocks';
import {StrapiFlexibleContent} from '@/utils/cms/types';

type PageProps = {
  FlexibleContent: StrapiFlexibleContent;
};

type ContactPageProps = {
  data: PageProps;
};

const ContactPage = ({data}: ContactPageProps) => {
  const {FlexibleContent} = data;
  return <>{mapBlocks(FlexibleContent)}</>;
};

export default ContactPage;
