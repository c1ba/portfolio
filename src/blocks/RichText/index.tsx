import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components//Grid/GridContainer';
import RichTextComponent from '@/components/RichText';
import {COLUMN_SPAN_CONFIG} from '@/app/theme/common';

type RichTextProps = {
  HtmlId?: string;
  Content: string;
  className?: string;
};

const RichText = ({HtmlId, Content, className, ...props}: RichTextProps) => {
  const classNames = [className].filter(Boolean).join(' ');

  return (
    <section className={classNames} {...props}>
      <GridItem>
        <GridContainer>
          <GridItem columnSpan={COLUMN_SPAN_CONFIG}>
            <RichTextComponent id={HtmlId} content={Content} />
          </GridItem>
        </GridContainer>
      </GridItem>
    </section>
  );
};

export default RichText;
