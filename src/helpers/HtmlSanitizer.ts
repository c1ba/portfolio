type HTMLTag = keyof HTMLElementTagNameMap;

const INITIALLY_ALLOWED_TAGS: HTMLTag[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'a',
  'span',
  'li',
  'ul',
  'ol',
  'div',
];

const WHITESPACE_CHARACTERS = {
  '&nbsp;': '\u00A0', // non-breaking space
  '&ensp;': '\u2002', // en space
  '&emsp;': '\u2003', // em space
  '&thinsp;': '\u2009', // thin space
  '&hairsp;': '\u200A', // hair space
  '&numsp;': '\u2007', // figure space
  '&puncsp;': '\u2008', // punctuation space
  '&emsp13;': '\u2004', // three-per-em space
  '&emsp14;': '\u2005', // four-per-em space
  '&mediumsp;': '\u205F', // medium mathematical space
  '&nnbsp;': '\u202F', // narrow no-break space
  '&zwnj;': '\u200C', // zero-width non-joiner
  '&zwj;': '\u200D', // zero-width joiner
  '&lrm;': '\u200E', // left-to-right mark
  '&rlm;': '\u200F', // right-to-left mark
  '&shy;': '\u00AD', // soft hyphen (invisible)
  '&zwsp;': '\u200B', // zero-width space (not an official named entity, but common)
};

class HtmlSanitizer {
  private html: string;
  private allowedTags: HTMLTag[] = INITIALLY_ALLOWED_TAGS;

  constructor(
    html: string,
    options?: {
      allowedTags?: HTMLTag[];
      // TODO: Do something with this
      allowedAttributes?: string[];
    },
  ) {
    this.html = html;
    this.html = HtmlSanitizer.normalizeCharacters(
      this.html,
      WHITESPACE_CHARACTERS,
    );
    this.allowedTags = [...this.allowedTags, ...(options?.allowedTags || [])];
    const removableTags = HtmlSanitizer.getRemovableTags(
      this.html,
      this.allowedTags,
    );
    this.html = HtmlSanitizer.removeTags(this.html, removableTags);
    return this;
  }

  private static normalizeCharacters(
    html: string,
    characters: {[character: string]: string},
  ) {
    let parsedHtml = html;
    Object.entries(characters).forEach(([character, value]) => {
      const regex = new RegExp(`${character}`, 'gi');
      parsedHtml = parsedHtml.replace(regex, value);
    });
    return parsedHtml;
  }

  // Search all tags in the HTML snippet by closing tags and void tags.
  // Get rid of duplicates and excepted tags.
  private static getRemovableTags(html: string, exceptedTags: HTMLTag[] = []) {
    const closingTags = Array.from(
      new Set([...html.matchAll(/(?:<\/(\w+?)>)|(?:<(\w+?)(?:.[^>]+?\/)>)/gi)]),
    ).map((match) => match[2] || match[1]) as HTMLTag[];
    return closingTags.filter(
      (tag) => !exceptedTags.some((exceptedTag) => exceptedTag === tag),
    );
  }

  private static removeTags(html: string, tags: HTMLTag[]) {
    let parsedHtml = html;
    tags.forEach((tag) => {
      const regex = new RegExp(
        `(?:<(${tag})(?:.|\n)*?>)((.|\n)*?)(?:<\/\\1>)`,
        'gi',
      );
      parsedHtml = parsedHtml.replace(regex, '');
    });
    return parsedHtml;
  }

  sanitizeCharacters(characters: {[character: string]: string}) {
    this.html = HtmlSanitizer.normalizeCharacters(this.html, characters);
    return this;
  }

  getHtml() {
    return this.html;
  }
}

export default HtmlSanitizer;
