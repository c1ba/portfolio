type PageProps = {
  Hero: {
    Heading: string;
    Subheading?: string;
  };
};

type ContactPageProps = {
  data: PageProps;
};

const ContactPage = ({data}: ContactPageProps) => {
  return <></>;
};

export default ContactPage;
