import {IconSize} from '@/app/theme/types';
import {collectIcons} from '@/app/theme/utils/icons';
import client from '@/utils/cms/client';
import IconWithTooltip from '@/components/Icon/IconWithTooltip';
import {ICON_PLACEHOLDER_REGEX} from './consts';
import Icon from '@/components/Icon/Icon';

export const generateIcons = async (html: string) => {
  const iconPlaceholders = html.matchAll(ICON_PLACEHOLDER_REGEX);
  if (!ICON_PLACEHOLDER_REGEX.test(html)) {
    return html;
  }

  const iconsData = [...iconPlaceholders]
    .filter((iconMatch) => {
      const attributes = iconMatch[2];

      if (!/data-icon-code="(\w+?)"/g.test(attributes)) {
        return false;
      }

      const iconCodeMatch = /data-icon-code="(\w+?)"/gi.exec(attributes);
      const code = iconCodeMatch?.[1];
      return !!code;
    })
    .map((iconMatch) => {
      const attributes = iconMatch[2];

      const iconCodeMatch = /data-icon-code="(\w+?)"/gi.exec(attributes);
      const code = iconCodeMatch?.[1];

      const hasTooltip = /data-tooltip/gi.test(attributes);
      const size = /data-size="(xs|sm|md|lg|xl)"/gi.exec(attributes)?.[1];

      return {
        code: code as string,
        enableTooltip: hasTooltip,
        label: iconMatch[3],
        size: (!!size
          ? ['xs', 'sm', 'md', 'lg', 'xl'].includes(size)
            ? size
            : 'md'
          : 'md') as IconSize | undefined,
      };
    });

  const cms = await client;
  const icons = await collectIcons(cms, iconsData, ['code']);
  const iconRenders = iconsData.map((iconData, idx) => {
    return iconData.enableTooltip ? (
      <IconWithTooltip
        key={`rich-text-icon-with-tooltip-${idx}`}
        label={iconData.label}
        src={icons[iconData.code].default}
        size={iconData.size || 'md'}
      />
    ) : (
      <Icon
        key={`rich-text-icon-${idx}`}
        label={iconData.label}
        src={icons[iconData.code].default}
        size={iconData.size || 'md'}
      />
    );
  });

  return iconRenders;
};
