import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components//Grid/GridContainer';
import RichTextComponent from '@/components/async/RichText';
import {COLUMN_SPAN_CONFIG} from '@/app/theme/common';
import Section from '@/components/Section';

type RichTextProps = {
  HtmlId?: string;
  Content: string;
  className?: string;
};

const RichText = ({HtmlId, Content, className, ...props}: RichTextProps) => {
  const classNames = [className].filter(Boolean).join(' ');

  return (
    <Section className={classNames} {...props}>
      <GridItem>
        <GridContainer>
          <GridItem columnSpan={COLUMN_SPAN_CONFIG}>
            <RichTextComponent id={HtmlId} content={Content} />
          </GridItem>
        </GridContainer>
      </GridItem>
    </Section>
  );
};

export default RichText;
