import RichTextComponent from '@/components/RichText';
import processHtml from './processHtml';
import HTMLParser from '@/helpers/HTMLParser';

type RichTextProps = {
  id?: string;
  content: string;
  className?: string;
};

const RichText = async ({id, content, className, ...props}: RichTextProps) => {
  const parsedHtml = await processHtml(content);
  const h = new HTMLParser(content);

  return (
    <RichTextComponent
      content={parsedHtml}
      id={id}
      className={className}
      {...props}
    />
  );
};

export default RichText;
