import useInitialScroll from '@/helpers/useInitialScroll';
import GeneralHero from '../GeneralHero';
import {GeneralHeroProps} from '../types';
import styles from './ScreenHero.module.scss';

const ScreenHero = ({...props}: GeneralHeroProps) => {
  const initialScroll = useInitialScroll();
  return (
    <GeneralHero
      {...props}
      className={!initialScroll ? styles.fullHeight : undefined}
    />
  );
};

export default ScreenHero;
