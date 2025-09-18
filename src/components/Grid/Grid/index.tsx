import {PropsWithChildren} from 'react';
import styles from './Grid.module.scss';
import {NumberRange} from '@/utils/types';
import {dashCase} from '@/utils/stringUtils';
import {ColumnSpan} from '@/app/styles/types';

type GridProps = PropsWithChildren<{
  columnSpan?: ColumnSpan;
  className?: string;
}>;

const Grid = ({columnSpan, className, children, ...props}: GridProps) => {
  const columnSpans = !columnSpan
    ? []
    : Object.entries(columnSpan)
        .filter(([_device, colSpan]) => {
          return !!colSpan;
        })
        .map(([device, {range, symmetric}]) => {
          const deviceClass = dashCase(device);
          const className = `${deviceClass}-${symmetric ? 'symmetric-' : ''}span-${range}`;
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

export default Grid;
