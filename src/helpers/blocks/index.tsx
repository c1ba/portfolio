import CinematicCarousel from '@/blocks/CinematicCarousel';
import ProjectsList from '@/blocks/ProjectsList';
import RichText from '@/blocks/RichText';
import {JSX} from 'react/jsx-runtime';

const MAPPING: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (props: any) => JSX.Element | Promise<JSX.Element>;
} = {
  ComponentGeneralRichText: RichText,
  ComponentGeneralCinematicCarousel: CinematicCarousel,
  ComponentGeneralProjectsList: ProjectsList,
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
      // delete props.__typename;
      return <Component key={`flexible-component-${index}`} {...props} />;
    })
    .filter(Boolean);
};

export default mapBlocks;
