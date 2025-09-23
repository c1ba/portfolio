import styles from './FakeCard.module.scss';
import CardFrame from '../CardFrame';

type FakeCardProps = {
  size?: 1 | 0.25 | 0.5 | 0.75;
  className?: string;
};

const FakeCard = ({size, className}: FakeCardProps) => {
  const classNames = [
    size ? styles[`multiplier-${size.toString().replace('.', '-')}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <CardFrame className={classNames} enableHover={false}>
      <div className={styles.cardBackground} />
    </CardFrame>
  );
};

export default FakeCard;
