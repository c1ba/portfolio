import type {NextConfig} from 'next';
import env from '@/utils/env.mjs';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(`${env.NEXT_PUBLIC_CDN_HOST}/**`)],
  },
};

export default nextConfig;
