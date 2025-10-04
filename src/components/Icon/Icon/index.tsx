import icons from '@/app/theme/icons';
import {Icon as IconType} from '../types';
import styles from './Icon.module.scss';

type IconProps = IconType & {
  flipX?: boolean;
  flipY?: boolean;
  className?: string;
};

// Momentarily we only have external icons , so leaving it like this until I include internal icons as well
const Icon = ({
  code,
  label,
  src,
  size = 'sm',
  flipX,
  flipY,
  className,
}: IconProps) => {
  const classNames = [
    styles.icon,
    styles[`icon-${size}`],
    flipX && styles.flipX,
    flipY && styles.flipY,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const FallbackIcon = () => {
    return (
      <span {...(label ? {['aria-label']: label} : {})}>
        <img aria-hidden src={src} className={classNames} />
      </span>
    );
  };

  if (!code) {
    return <FallbackIcon />;
  }

  const iconData = icons[code as string];
  if (!iconData) {
    console.warn(
      'Icon was not found by code. Falling back to external source.',
    );

    return <FallbackIcon />;
  }

  const IconContent = iconData.default;
  return (
    <span {...(label ? {['aria-label']: label} : {})}>
      <div aria-hidden className={classNames}>
        <IconContent />
      </div>
    </span>
  );
  return <></>;
};

export default Icon;
