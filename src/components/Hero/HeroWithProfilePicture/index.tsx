import {StrapiImage} from '@/utils/cms/types';
import Image from 'next/image';

export type HeroWithProfilePictureProps = {
  heading: string;
  subheading?: string;
  profilePicture?: StrapiImage;
};

const HeroWithProfilePicture = ({
  heading,
  subheading,
  profilePicture,
}: HeroWithProfilePictureProps) => {
  return (
    <div>
      <h2>{heading}</h2>
      {subheading && <p>{subheading}</p>}
      {profilePicture && (
        <Image
          src={profilePicture.url}
          alt={profilePicture.alternativeText}
          width={parseInt(profilePicture.width, 10)}
          height={parseInt(profilePicture.height, 10)}
        />
      )}
    </div>
  );
};

export default HeroWithProfilePicture;
