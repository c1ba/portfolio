import RichTextWrapper from './RichTextWrapper';
import processHtml from './processHtml';

type RichTextProps = {
  id?: string;
  content: string;
  className?: string;
};

const RichText = async ({id, content, className, ...props}: RichTextProps) => {
  const parsedHtml = await processHtml(content);

  return (
    <RichTextWrapper content={parsedHtml} className={className} {...props} />
  );
};

export default RichText;
