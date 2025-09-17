import {z} from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  STRAPI_TOKEN: z.string().min(10),
});

const env = envSchema.parse(process.env);

export default env;
