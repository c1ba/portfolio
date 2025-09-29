import TemplateContainer from '@/components/TemplateContainer';

type PageProps = {
  Hero: {
    Heading: string;
    Subheading?: string;
  };
};

type ContactPageProps = {
  data: PageProps;
  isInnerPage?: boolean;
  url?: string;
};

const ContactPage = ({data, isInnerPage, url}: ContactPageProps) => {
  return (
    <TemplateContainer isInnerPage={isInnerPage} url={url}></TemplateContainer>
  );
};

export default ContactPage;
