type TagState = {
  tagName?: string;
  attributes?: string;
  children: TagState[];
  content?: string;
  status: 'open' | 'text' | 'closed';
};

const MATCHING_TOKEN =
  /^<([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>|^(<\/([a-zA-Z][a-zA-Z0-9]*)\s*>)|^([^<>]+)/i;

const OPENING_TAG = /^<([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>/i;
const CLOSING_TAG = /^(<\/([a-zA-Z][a-zA-Z0-9]*)\s*>)/i;
const TEXT_CONTENT = /^([^<>]+)/i;

class HTMLParser {
  private tree: TagState[] = [];
  constructor(html: string) {
    const spaces = html.matchAll(/>(\s+)</gi);
    const h = Array.from(spaces).reduce(
      (prev, space) => prev.replace(space[1], ''),
      html,
    );
    this.tree = HTMLParser.parse(h);
    console.log(this.tree);
  }

  private static getDeepestOpenChildPath(
    state: TagState[],
    currentLevels: number[] = [],
  ): number[] {
    const currentLevelChild = state.find((node) => node.status === 'open');
    if (!currentLevelChild) {
      return [];
    }

    if (!currentLevelChild.children || !currentLevelChild.children.length) {
      currentLevels.push(state.indexOf(currentLevelChild));
      return currentLevels;
    }

    const openChild = currentLevelChild.children?.find(
      (childNode) => childNode.status === 'open',
    );

    if (!openChild) {
      currentLevels.push(state.indexOf(currentLevelChild));
      return currentLevels;
    }

    currentLevels.push(state.indexOf(currentLevelChild));
    return HTMLParser.getDeepestOpenChildPath(
      currentLevelChild.children,
      currentLevels,
    );
  }

  private static insertChild(
    level: TagState[],
    treeLevel: number[],
    insertingChild: TagState,
  ): void {
    const currentTreeLevel = treeLevel;
    if (!level.length) {
      level.push(insertingChild);
      return;
    }

    if (!level[currentTreeLevel[0]]) {
      level.push(insertingChild);
      return;
    }

    if (currentTreeLevel.length === 1) {
      level[currentTreeLevel[0]].children.push(insertingChild);
      return;
    }

    const prevIndex = currentTreeLevel.shift() as number;
    if (!currentTreeLevel.length) {
      return;
    }
    HTMLParser.insertChild(
      level[prevIndex].children as TagState[],
      currentTreeLevel,
      insertingChild,
    );
  }

  private static closeChild(
    level: TagState[],
    treeLevel: number[],
    currentNode: TagState | undefined = undefined,
  ): void {
    const currentTreeLevel = treeLevel;

    if (!level.length) {
      if (currentNode) {
        currentNode.status = 'closed';
      }
      return;
    }

    if (!level[currentTreeLevel[0]]) {
      if (currentNode) {
        currentNode.status = 'closed';
      }
      return;
    }

    if (
      !level[currentTreeLevel[0]].children.filter(
        (node) => node.status === 'open',
      ).length
    ) {
      level[currentTreeLevel[0]].status = 'closed';
      return;
    }

    const prevIndex = currentTreeLevel.shift() as number;
    if (!currentTreeLevel.length) {
      return;
    }

    HTMLParser.closeChild(
      level[prevIndex].children as TagState[],
      currentTreeLevel,
      level[prevIndex],
    );
  }

  private static parse(
    html: string,
    state: TagState[] = [],
    tree: TagState[] = [],
  ): TagState[] {
    const htmlClone = html;
    const currentState: TagState[] = state;
    const currentTree = tree;

    if (!htmlClone) {
      // If the HTML string is empty, the state should be empty as well.
      if (!!Object.keys(currentState).length) {
        // Error handling
        return [];
      }
      return currentTree;
    }

    // Given we check first if the html is empty, I'll presume that something's wrong if it doesn't find neither an opening/closing tag or text content.
    const firstToken = html.match(MATCHING_TOKEN);
    if (!firstToken || !firstToken.length) {
      // Error handling
      return [];
    }

    // If token contains an opening tag, closing tag or text content, process depending on the case into the state and tree.
    // Remove token from html and repear parse.
    const isOpeningTag = OPENING_TAG.test(firstToken[0]);
    const isClosingTag = CLOSING_TAG.test(firstToken[0]);
    const isTextContent = TEXT_CONTENT.test(firstToken[0]);

    console.log(firstToken[0], isOpeningTag, isClosingTag, isTextContent);
    const stateTreePath = HTMLParser.getDeepestOpenChildPath(state);
    switch (true) {
      case isOpeningTag:
        console.log('OPENING TAG');
        // Extract attributes and tag name
        const tagName = firstToken[1];
        const attributes = firstToken[2];
        if (!tagName) {
          throw new Error(
            'Something went wrong while trying to read the opening tag.',
          );
        }

        const tagState: TagState = {
          tagName,
          attributes,
          children: [],
          status: 'open',
        };

        if (!stateTreePath || !stateTreePath.length) {
          currentState.push(tagState);
          break;
        }
        HTMLParser.insertChild(currentState, stateTreePath, tagState);
        break;
      case isTextContent:
        console.log('TEXT_CONTENT');
        const textContent = firstToken[5];
        const textContentState: TagState = {
          content: textContent,
          children: [],
          status: 'text',
        };

        // Should I allow text content in root or should I handle it somehow?
        if (!stateTreePath || !stateTreePath.length) {
          currentState.push(textContentState);
          break;
        }

        HTMLParser.insertChild(currentState, stateTreePath, textContentState);
        break;
      case isClosingTag:
        console.log('CLOSING_TAG');
        const closingTag = firstToken[4];
        HTMLParser.closeChild(currentState, stateTreePath);
        if (
          stateTreePath.length <= 1 &&
          html.replace(firstToken[0], '') === ''
        ) {
          return currentState;
        }
        break;
      default:
        // Error handling
        return [];
    }

    return HTMLParser.parse(
      html.replace(firstToken[0], ''),
      currentState,
      currentTree,
    );
  }
}

export default HTMLParser;
