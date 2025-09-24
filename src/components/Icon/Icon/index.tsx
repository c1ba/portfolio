import {Icon as IconType} from '../types';
import styles from './Icon.module.scss';

type IconProps = IconType & {
  isExternalIcon?: boolean;
};

// Momentarily we only have external icons , so leaving it like this until I include internal icons as well
const Icon = ({code, label, src, size = 'sm', isExternalIcon}: IconProps) => {
  const classNames = [styles.icon, styles[`icon-${size}`]]
    .filter(Boolean)
    .join(' ');
  return (
    <span {...(label ? {['aria-label']: label} : {})}>
      <img aria-hidden src={src} className={classNames} />
    </span>
  );
};

export default Icon;
