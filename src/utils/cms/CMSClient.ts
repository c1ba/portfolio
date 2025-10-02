import {
  ApolloClient,
  DocumentNode,
  HttpLink,
  InMemoryCache,
  TypedDocumentNode,
} from '@apollo/client';
import {SetContextLink} from '@apollo/client/link/context';
import {
  SitewideMetas,
  StrapiIcon,
  StrapiPageMeta,
  StrapiProjectMeta,
  TemplateURLs,
} from './types';
import {ICONS, PAGE_METADATA, PROJECT_METAS, SITE_URLS} from './queries';
import {OperationVariables} from '@apollo/client';
import {createFragmentRegistry} from '@apollo/client/cache';
import {getRecursivePaths, PROJECT_PATH} from '../fileUtils';

type PageData = {url: string; pageType: string};

type ApolloQueryOptions = {
  host: string;
  authToken: string | undefined;
  headers?: {
    [key: string]: string;
  };
  miscellanious?: {
    fragments?: DocumentNode[];
  };
};

class CMSClient {
  private client: ApolloClient;

  constructor(options: ApolloQueryOptions) {
    if (!options.host || !options.authToken) {
      throw new Error(
        `[CMSClient] Please make sure that Host or Authentication Token are properly set.`,
      );
    }
    const httpConfig = new SetContextLink(() => {
      const token = options.authToken;
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
          ...options.headers,
        },
      };
    });

    const client = new ApolloClient({
      link: httpConfig.concat(new HttpLink({uri: options.host})),
      cache: new InMemoryCache(),
    });
    this.client = client;

    const fragmentsRegistry = createFragmentRegistry(
      ...(options.miscellanious?.fragments || []),
    );

    const cacheWithDeclaredFragments = new InMemoryCache({
      fragments: fragmentsRegistry,
    });
    this.client.cache = cacheWithDeclaredFragments;
  }

  static async readFragments(targetFiles?: string[]) {
    const paths = getRecursivePaths(
      PROJECT_PATH,
      targetFiles || ['query.ts', 'fragments.ts'],
    );

    const overallFragments: DocumentNode[] = [];
    const promises = paths.map(async (path) => {
      // TODO: Make this work for other OSes as well
      const windowsPath = path.replaceAll('/', '\\');

      const code = await import(
        /* webpackIgnore: true */ `file://${windowsPath}`
      );
      const fragments: DocumentNode[] = Object.values(code).filter((value) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const {kind, definitions} = value as any;
        if (kind !== 'Document') {
          return false;
        }

        return definitions[0].kind === 'FragmentDefinition';
      }) as DocumentNode[];

      overallFragments.push(...fragments);
      return fragments;
    });
    await Promise.all(promises);
    return overallFragments;
  }

  async querySitewideURLs() {
    try {
      const {data, error} = await this.client.query<TemplateURLs>({
        query: SITE_URLS,
      });

      if (error) {
        throw new Error(`[${error.name}]: ${error.message}`);
      }

      if (!data) {
        return [];
      }
      const urls: PageData[] = [];

      Object.values(data).forEach((cmsData) => {
        const slugs = cmsData
          .filter(({DisablePageGeneration}) => !DisablePageGeneration)
          .map(({URL, __typename}) => ({
            url: URL,
            pageType: `${__typename.toLowerCase()[0]}${__typename.substring(1)}`,
          }));

        urls.push(...slugs);
      });

      return urls;
    } catch (err) {
      console.error('[CMSClient] Error when querying sitewide URLs: ', err);
      return [];
    }
  }

  async querySitewidePageMeta(filters?: {
    disablePageGeneration?: boolean;
    url?: string;
  }) {
    try {
      const {data, error} = await this.client.query<SitewideMetas>({
        query: PAGE_METADATA,
        variables: {
          ...filters,
        },
      });

      if (error) {
        throw new Error(`[${error.name}]: ${error.message}`);
      }

      if (!data) {
        return [];
      }
      const sitewideMetas: (StrapiPageMeta & {URL: string})[] = [];

      Object.values(data).forEach((cmsData) => {
        if (!Array.isArray(cmsData)) {
          sitewideMetas.push({
            ...cmsData.PageMeta,
            URL: cmsData.URL || '/',
          });
          return;
        }

        sitewideMetas.push(
          ...cmsData.map((pageData) => ({
            ...pageData.PageMeta,
            URL: pageData.URL || '/',
          })),
        );
      });

      return sitewideMetas;
    } catch (err) {
      console.error('[CMSClient] Error when Sitewide Pages Metadata: ', err);
      return [];
    }
  }

  async querySinglePageProps<T>(
    query: DocumentNode | TypedDocumentNode<T, OperationVariables>,
  ) {
    try {
      const {data, error} = await this.client.query<T>({
        query,
      });

      if (error) {
        throw new Error(`[${error.name}]: ${error.message}`);
      }

      console.log(data);
      return data;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.error('[CMSClient] Error when querying single page props: ', err);
      return null;
    }
  }

  async queryByURL<T>(
    url: string,
    query: DocumentNode | TypedDocumentNode<T, OperationVariables>,
  ) {
    try {
      const {data, error} = await this.client.query<T>({
        query,
        variables: {
          filters: {
            URL: {
              eq: url,
            },
          },
        },
      });

      if (error) {
        throw new Error(`[${error.name}]: ${error.message}`);
      }

      return data;
    } catch (err) {
      console.error('[CMSClient] Error when querying single page props: ', err);
      return null;
    }
  }

  async queryIcons(filters?: {Code?: {in?: string[]}}) {
    try {
      const {data, error} = await this.client.query<{icons: StrapiIcon[]}>({
        query: ICONS,
        variables: {
          filters,
        },
      });

      if (error) {
        throw new Error(`[${error.name}]: ${error.message}`);
      }

      return data?.icons || [];
    } catch (err) {
      console.error('[CMSClient] Error when querying single page props: ', err);
      return [];
    }
  }

  async queryProjects() {
    try {
      const {data, error} = await this.client.query<{
        projectMetas: StrapiProjectMeta[];
      }>({
        query: PROJECT_METAS,
      });

      if (error) {
        throw new Error(`[${error.name}]: ${error.message}`);
      }

      return data?.projectMetas || [];
    } catch (err) {
      console.error('[CMSClient] Error when querying single page props: ', err);
      return [];
    }
  }
}

export default CMSClient;
