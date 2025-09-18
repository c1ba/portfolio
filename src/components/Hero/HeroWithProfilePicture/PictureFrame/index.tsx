import {StrapiImage} from '@/utils/cms/types';
import Image from 'next/image';
import styles from './PictureFrame.module.scss';

type PictureFrameProps = {
  image: StrapiImage;
};

const PictureFrame = ({image}: PictureFrameProps) => {
  return (
    <div className={styles.pictureFrame}>
      <div className={styles.triangleBottomRight} />
      <Image
        src={image.url}
        alt={image.alternativeText}
        width={197}
        height={198}
      />
    </div>
  );
};

export default PictureFrame;
