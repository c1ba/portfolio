import {StrapiImage} from '@/utils/cms/types';
import Image from 'next/image';

export type GeneralHeroProps = {
  heading: string;
  subheading?: string;
  thumbnail?: StrapiImage;
  profileImageMode?: boolean;
};

const GeneralHero = ({
  heading,
  subheading,
  thumbnail,
  profileImageMode,
}: GeneralHeroProps) => {
  return (
    <section>
      <h2>{heading}</h2>
      {subheading && <p>{subheading}</p>}
      {thumbnail && (
        <Image
          src={thumbnail.url}
          alt={thumbnail.alternativeText}
          width={parseInt(thumbnail.width, 10)}
          height={parseInt(thumbnail.height, 10)}
        />
      )}
    </section>
  );
};

export default GeneralHero;
