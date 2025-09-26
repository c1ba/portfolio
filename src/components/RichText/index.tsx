import {ColumnSpan, IconSize} from '@/app/theme/types';
import styles from './RichText.module.scss';
import HtmlSanitizer from '@/helpers/HtmlSanitizer';
import {collectIcons} from '@/app/theme/utils/icons';
import client from '@/utils/cms/client';
import IconWithTooltip from '../Icon/IconWithTooltip';
import {generateIcons} from './renderUtils';
import processHtml from './processHtml';

type RichTextProps = {
  id?: string;
  content: string;
  columnSpan?: ColumnSpan;
  overrideDefaultColumnSpan?: boolean;
  className?: string;
};

const RichText = async ({id, content, className, ...props}: RichTextProps) => {
  const classNames = [styles.richText, className].filter(Boolean).join(' ');
  const parsedHtml = await processHtml(content);

  return (
    <>
      <div
        className={classNames}
        id={id}
        dangerouslySetInnerHTML={{__html: parsedHtml}}
        {...props}
      />
    </>
  );
};

export default RichText;
