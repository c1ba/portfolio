import HtmlSanitizer from '@/helpers/HtmlSanitizer';
import styles from './RichText.module.scss';
import {generateIcons} from './renderUtils';
import {ICON_PLACEHOLDER_REGEX} from './consts';

const processHtml = async (html: string) => {
  try {
    const sanitizedHtml = new HtmlSanitizer(html).getHtml();

    const parsedHtml = sanitizedHtml.replaceAll(
      'data-display-horizontal',
      `class="${styles.displayHorizontal}"`,
    );
    const icons = await generateIcons(parsedHtml);
    const reactDom = await import('react-dom/server');
    const iconsRenderedHtml = [
      ...parsedHtml.matchAll(ICON_PLACEHOLDER_REGEX),
    ].reduce(
      (acc, match, idx) =>
        acc.replaceAll(match[0], reactDom.renderToStaticMarkup(icons[idx])),
      parsedHtml,
    );

    return iconsRenderedHtml;
  } catch (err) {
    console.error(err);
    return html;
  }
};

export default processHtml;
