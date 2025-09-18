import {NumberRange} from '@/utils/types';

export type DesktopColumnRange = NumberRange<1, 9>;

export type TabletLandscapeColumnRange = NumberRange<1, 8>;

export type TabletPortrtaitColumnRange = NumberRange<1, 6>;

export type MobileColumnRange = NumberRange<1, 4>;

export type ColumnSpan = Partial<{
  desktop: {
    range: DesktopColumnRange;
    symmetric?: boolean;
  };
  tabletLandscape: {
    range: TabletLandscapeColumnRange;
    symmetric?: boolean;
  };
  tabletPortrait: {
    range: TabletPortrtaitColumnRange;
    symmetric?: boolean;
  };
  mobile: {
    range: MobileColumnRange;
    symmetric?: boolean;
  };
}>;
