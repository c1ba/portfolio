import client from '@/utils/cms/client';
import {processAssetUrl} from '@/utils/cms/processors';

const PageMetadata = async ({url}: {url?: string}) => {
  const metas = await (
    await client
  ).querySitewidePageMeta({url: url, disablePageGeneration: false});
  const {
    Title,
    Description,
    Robots,
    CanonicalTag,
    OgTitle,
    OgUrl,
    OgDescription,
    OgType,
    OgImage,
  } = metas[0];
  return (
    <>
      <title>{Title}</title>
      {Description && <meta property="description" content={Description} />}
      {Robots && <meta property="robots" content={Robots} />}
      {OgTitle && <meta property="og:title" content={OgTitle} />}
      {OgUrl && <meta property="og:url" content={OgUrl} />}
      {OgDescription && (
        <meta property="og:description" content={OgDescription} />
      )}
      {OgTitle && <meta property="og:title" content={OgTitle} />}
      {OgImage && (
        <>
          <meta property="og:image" content={processAssetUrl(OgImage.url)} />
          {OgImage.alternativeText && (
            <meta property="og:image:alt" content={OgImage.alternativeText} />
          )}
          {OgImage.height && (
            <meta property="og:image:height" content={OgImage.height} />
          )}
          {OgImage.width && (
            <meta property="og:image:width" content={OgImage.width} />
          )}
        </>
      )}
      <meta property="og:type" content={OgType || 'website'} />
      <meta property="og:site_name" content={'Alexandra Costache'} />
    </>
  );
};

export default PageMetadata;
