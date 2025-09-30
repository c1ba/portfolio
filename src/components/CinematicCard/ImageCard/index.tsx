import {processStrapiImage} from '@/utils/cms/processors';
import {StrapiImage} from '@/utils/cms/types';
import Image from 'next/image';
import styles from './Card.module.scss';
import CardFrame from '../CardFrame';
import {Icon} from '@/app/theme/types';

type ImageCardProps = {
  title: string;
  url?: string;
  backgroundImage: StrapiImage | undefined;
  icons?: Icon[];
  className?: string;
  enableStartFade?: boolean;
  ref?: React.RefObject<HTMLAnchorElement | HTMLDivElement | null>;
};

const ImageCard = ({
  title,
  url,
  backgroundImage,
  icons,
  className,
  enableStartFade,
  ref,
}: ImageCardProps) => {
  const image = processStrapiImage(backgroundImage);
  return (
    <CardFrame
      title={title}
      url={url}
      className={className}
      enableStartFade={enableStartFade}
      icons={icons}
      ref={ref}
    >
      {image && (
        <Image
          className={styles.imageCard}
          src={image.url}
          alt={image.alternativeText || 'Ïmage card'}
          fill={true}
        />
      )}
      <div className={styles.cardBackground} />
    </CardFrame>
  );
};

export default ImageCard;
