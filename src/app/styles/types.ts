import {NumberRange} from '@/utils/types';

export type DesktopColumnRange = NumberRange<1, 10>;

export type TabletLandscapeColumnRange = NumberRange<1, 9>;

export type TabletPortrtaitColumnRange = NumberRange<1, 7>;

export type MobileColumnRange = NumberRange<1, 5>;

type DeviceRange =
  | DesktopColumnRange
  | TabletLandscapeColumnRange
  | TabletPortrtaitColumnRange
  | MobileColumnRange;

type ColumnSpanRange<D extends DeviceRange> = D | [D, D];

export type ColumnSpan = Partial<{
  desktop: {
    range: ColumnSpanRange<DesktopColumnRange>;
    symmetric?: boolean;
  };
  tabletLandscape: {
    range: ColumnSpanRange<TabletLandscapeColumnRange>;
    symmetric?: boolean;
  };
  tabletPortrait: {
    range: ColumnSpanRange<TabletPortrtaitColumnRange>;
    symmetric?: boolean;
  };
  mobile: {
    range: ColumnSpanRange<MobileColumnRange>;
    symmetric?: boolean;
  };
}>;
