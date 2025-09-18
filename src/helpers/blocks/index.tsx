import RichText from '@/components/RichText';
import {JSX} from 'react/jsx-runtime';

const MAPPING: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (props: any) => JSX.Element;
} = {
  ComponentGeneralRichText: RichText,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapBlocks = (blocks: ({__typename: string} & any)[]) => {
  return blocks.map((props, index) => {
    const blockType = props.__typename;
    const Component = MAPPING[blockType];
    if (!Component) {
      throw new Error('Component not found.');
    }
    return <Component key={`flexible-component-${index}`} {...props} />;
  });
};

export default mapBlocks;
