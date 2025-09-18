import CMSClient from './CMSClient';
import env from '@/utils/env.mjs';

// const client = new CMSClient({
//     host: "http://127.0.0.1:1337/cdn",
//     authToken: process.env.STRAPI_TOKEN,
//     // miscellanious: {
//     //     enableAutomaticFragmentScan: true
//     // }
// });

const client = CMSClient.readFragments().then((fragments) => {
  return new CMSClient({
    host: 'http://127.0.0.1:1337/cdn',
    authToken: env.STRAPI_TOKEN,
    miscellanious: {
      fragments: fragments,
    },
  });
});

export default client;
