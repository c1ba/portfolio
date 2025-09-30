import {PropsWithChildren} from 'react';
import styles from './GridItem.module.scss';
import {dashCase} from '@/utils/stringUtils';
import {ColumnSpan} from '@/app/theme/types';

type GridProps = PropsWithChildren<{
  columnSpan?: ColumnSpan;
  className?: string;
}>;

const GridItem = ({columnSpan, className, children, ...props}: GridProps) => {
  const columnSpans = !columnSpan
    ? []
    : Object.entries(columnSpan)
        .filter(([_device, colSpan]) => {
          return !!colSpan;
        })
        .map(([device, {range, symmetric}]) => {
          const deviceClass = dashCase(device);
          const className = !Array.isArray(range)
            ? `${deviceClass}-${symmetric ? 'symmetric-' : ''}span-${range}`
            : `${deviceClass}-span-${range[0]}-${range[1]}`;
          return styles[className];
        })
        .filter(Boolean);

  const classNames = [styles.grid, ...columnSpans, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export default GridItem;
