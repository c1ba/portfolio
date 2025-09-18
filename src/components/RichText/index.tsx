import {ColumnSpan} from '@/app/styles/types';
import Grid from '../Grid/Grid';
import GridContainer from '../Grid/GridContainer';
import styles from './RichText.module.scss';

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
  const classNames = [styles.richText, className].filter(Boolean).join(' ');

  // TODO: Add HTML sanitizer
  return (
    <Grid>
      <section>
        <GridContainer>
          <Grid columnSpan={COLUMN_SPAN_CONFIG}>
            <div
              className={classNames}
              id={HtmlId}
              dangerouslySetInnerHTML={{__html: Content}}
              {...props}
            />
          </Grid>
        </GridContainer>
      </section>
    </Grid>
  );
};

export default RichText;
