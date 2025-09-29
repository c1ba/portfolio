import {PropsWithChildren} from 'react';
import styles from './Section.module.scss';

type SectionProps = {
  id?: string;
  className?: string;
};

const Section = ({
  id,
  className,
  children,
  ...props
}: PropsWithChildren<SectionProps>) => {
  const classNames = [styles.section, className].filter(Boolean).join(' ');
  return (
    <section {...(id ? {id} : {})} className={classNames} {...props}>
      {children}
    </section>
  );
};

export default Section;
