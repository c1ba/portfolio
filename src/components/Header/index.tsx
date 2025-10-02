'use client';
import {Icon} from '@/app/theme/types';
import Link from 'next/link';
import IconComponent from '../Icon/Icon';
import styles from './Header.module.scss';
import useInitialScroll from '@/helpers/useInitialScroll';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import {COLUMN_SPAN_CONFIG} from '@/app/theme/common';
import IntersectorObserverWrapper from '@/helpers/IntersectorObserverWrapper';
import React from 'react';

type Section = {
  displayText: string;
  screenreaderText?: string;
  url?: string;
  icon?: Icon & {code: string; label?: string};
};

type HeaderProps = {
  sections: Section[];
  socials?: Section[];
};

const Header = ({sections, socials}: HeaderProps) => {
  const scroll = useInitialScroll();
  return (
    <GridContainer className={styles.headerGridContainer}>
      <GridItem columnSpan={COLUMN_SPAN_CONFIG}>
        <header
          className={`${styles.header}${scroll ? ` ${styles.visible}` : ``}`}
        >
          <IntersectorObserverWrapper threshold={1}>
            {(ref: React.RefObject<HTMLElement | null>, inView) => (
              <nav
                ref={ref}
                className={`${styles.linkSectionsNav}${inView ? ` ${styles.navVisible}` : ''}`}
              >
                <div
                  className={`${styles.linkSectionsNavWrapper}${inView ? ` ${styles.navWrapperVisible}` : ''}`}
                >
                  {sections.map((section, idx) =>
                    section.url ? (
                      <Link key={`link-${idx}`} href={section.url}>
                        {section.displayText}
                      </Link>
                    ) : (
                      <></>
                    ),
                  )}
                </div>
              </nav>
            )}
          </IntersectorObserverWrapper>
          <nav className={styles.socialsSection}>
            {(socials || []).map((section, idx) =>
              section.url ? (
                <Link
                  key={`link-social-${idx}`}
                  href={section.url}
                  target="_blank"
                >
                  {section.icon ? (
                    <IconComponent src={section.icon?.default} />
                  ) : (
                    section.displayText
                  )}
                </Link>
              ) : (
                <></>
              ),
            )}
          </nav>
        </header>
      </GridItem>
    </GridContainer>
  );
};

export default Header;
