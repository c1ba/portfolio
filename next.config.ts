import type {NextConfig} from 'next';
import env from '@/utils/env.mjs';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL(`${env.NEXT_PUBLIC_CDN_HOST}/**`)],
  },
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.module.rules.push({
      test: /\.tsx$/,
      loader: './loaders/svgr.js',
    });
    return config;
  },
};

export default nextConfig;
