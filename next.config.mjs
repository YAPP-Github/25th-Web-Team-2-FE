/** @type {import('next').NextConfig} */

import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dobby-dev-bucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '/resized-images/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // next server build => ignore msw/browser
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/browser', alias: false });
      } else {
        config.resolve.alias['msw/browser'] = false;
      }
    } else {
      // browser build => ignore msw/node
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/node', alias: false });
      } else {
        config.resolve.alias['msw/node'] = false;
      }
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/error',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract(nextConfig);
