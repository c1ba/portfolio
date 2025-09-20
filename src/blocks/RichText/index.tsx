import {ColumnSpan} from '@/app/styles/types';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components//Grid/GridContainer';
import RichTextComponent from '@/components/RichText';

type RichTextProps = {
  HtmlId?: string;
  Content: string;
  className?: string;
};

const COLUMN_SPAN_CONFIG: ColumnSpan = {
  desktop: {
    range: 3,
    symmetric: true,
  },
  tabletLandscape: {
    range: 2,
    symmetric: true,
  },
  tabletPortrait: {
    range: 2,
    symmetric: true,
  },
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
