import CMSClient from '@/utils/cms/CMSClient';
import {processStrapiIcons} from '@/utils/cms/processors';

export const collectIcons = async <T>(
  cms: CMSClient,
  array: T[],
  fieldKeys: (keyof T)[],
) => {
  const iconCodes = Array.from(
    new Set(
      array
        .reduce<
          T[keyof T][]
        >((accumulator, elem) => [...accumulator, ...fieldKeys.map((key) => elem[key])], [])
        .filter(Boolean),
    ),
  ) as string[];
  const icons = processStrapiIcons(
    await cms.queryIcons({Code: {in: iconCodes}}),
  );
  return icons;
};
