import {processStrapiImage} from '@/utils/cms/processors';
import {StrapiImage} from '@/utils/cms/types';
import Image from 'next/image';
import styles from './Card.module.scss';
import CardFrame from '../CardFrame';

type ImageCardProps = {
  title: string;
  url?: string;
  backgroundImage: StrapiImage | undefined;
  icons?: {default: string; variant?: string}[];
  className?: string;
  animations?: string;
};

const ImageCard = ({
  title,
  url,
  backgroundImage,
  icons,
  className,
  animations,
}: ImageCardProps) => {
  const image = processStrapiImage(backgroundImage);
  return (
    <CardFrame
      title={title}
      url={url}
      className={className}
      animations={animations}
      icons={icons}
    >
      {image ? (
        <Image
          className={styles.imageCard}
          src={image.url}
          alt={image.alternativeText || 'Ïmage card'}
          fill={true}
        />
      ) : (
        <></>
      )}
    </CardFrame>
  );
};

export default ImageCard;
