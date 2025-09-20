import {ColumnSpan} from '@/app/styles/types';
import styles from './RichText.module.scss';
import HtmlSanitizer from '@/helpers/HtmlSanitizer';

type RichTextProps = {
  id?: string;
  content: string;
  columnSpan?: ColumnSpan;
  overrideDefaultColumnSpan?: boolean;
  className?: string;
};

const RichText = ({id, content, className, ...props}: RichTextProps) => {
  const classNames = [styles.richText, className].filter(Boolean).join(' ');
  const sanitizedHtml = new HtmlSanitizer(content).getHtml();

  return (
    <div
      className={classNames}
      id={id}
      dangerouslySetInnerHTML={{__html: sanitizedHtml}}
      {...props}
    />
  );
};

export default RichText;
