import {StrapiImage} from '@/utils/cms/types';
import Image from 'next/image';
import styles from './PictureFrame.module.scss';

type PictureFrameProps = {
  image: StrapiImage;
  className?: string;
};

const PictureFrame = ({image, className, ...props}: PictureFrameProps) => {
  const classNames = [styles.pictureFrame, className].filter(Boolean).join(' ');
  return (
    <div className={classNames} {...props}>
      <div className={styles.triangleBottomRight} />
      <Image
        src={image.url}
        alt={image.alternativeText || 'Profile Picture'}
        width={197}
        height={198}
      />
    </div>
  );
};

export default PictureFrame;
