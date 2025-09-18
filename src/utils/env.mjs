import {createEnv} from '@t3-oss/env-nextjs';
import {z} from 'zod';

const env = createEnv({
  server: {
    NEXT_PUBLIC_API_URL: z.string().optional(),
    STRAPI_TOKEN: z.string().min(10),
  },
  client: {
    NEXT_PUBLIC_CDN_HOST: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_CDN_HOST: process.env.NEXT_PUBLIC_CDN_HOST,
    STRAPI_TOKEN: process.env.STRAPI_TOKEN,
  },
});

export default env;
