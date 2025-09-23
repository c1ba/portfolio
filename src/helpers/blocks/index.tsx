import CinematicCarousel from '@/blocks/CinematicCarousel';
import RichText from '@/blocks/RichText';
import {JSX} from 'react/jsx-runtime';

const MAPPING: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (props: any) => JSX.Element;
} = {
  ComponentGeneralRichText: RichText,
  ComponentGeneralCinematicCarousel: CinematicCarousel,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapBlocks = (blocks: ({__typename: string} & any)[]) => {
  return blocks
    .map((props, index) => {
      const blockType = props.__typename;
      const Component = MAPPING[blockType];
      if (!Component) {
        console.warn(
          `Component for ${blockType.replace('ComponentGeneral', '')} has not been found, thus the section won't be rendered`,
        );
        return undefined;
      }
      return <Component key={`flexible-component-${index}`} {...props} />;
    })
    .filter(Boolean);
};

export default mapBlocks;
