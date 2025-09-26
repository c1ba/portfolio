import Icon from '../Icon';
import {Icon as IconProps} from '../types';
import styles from './IconWithTooltip.module.scss';

type IconWithTooltipProps = IconProps & {
  className?: string;
};

const IconWithTooltip = ({
  label,
  src,
  size,
  className,
}: IconWithTooltipProps) => {
  const classNames = [styles.container, className].filter(Boolean).join(' ');
  return (
    <div className={classNames}>
      <div className={styles.tooltip}>
        <span>
          <strong>{label}</strong>
        </span>
      </div>
      <Icon label={label} src={src} size={size} />
    </div>
  );
};

export default IconWithTooltip;
