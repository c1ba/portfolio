import {ColumnSpan} from '@/app/styles/types';
import GridItem from '../Grid/GridItem';
import GridContainer from '../Grid/GridContainer';
import styles from './RichText.module.scss';

type RichTextProps = {
  id?: string;
  content: string;
  columnSpan?: ColumnSpan;
  overrideDefaultColumnSpan?: boolean;
  className?: string;
};

const RichText = ({id, content, className, ...props}: RichTextProps) => {
  const classNames = [styles.richText, className].filter(Boolean).join(' ');

  // TODO: Add HTML sanitizer
  return (
    <div
      className={classNames}
      id={id}
      dangerouslySetInnerHTML={{__html: content}}
      {...props}
    />
  );
};

export default RichText;
