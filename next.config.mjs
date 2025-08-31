/** @type {import('next').NextConfig} */
import { withSentryConfig } from '@sentry/nextjs';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dobby-dev-bucket.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'dobby-prod-bucket.s3.ap-northeast-2.amazonaws.com',
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
};

const withVanillaExtract = createVanillaExtractPlugin();

const isProd = process.env.NODE_ENV === 'production';

// https://www.npmjs.com/package/@sentry/webpack-plugin#options
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
export default withSentryConfig(withVanillaExtract(nextConfig), {
  org: 'gradmeet',
  project: 'gradmeet-front',

  // 빌드 메세지 출력 숨김 여부 (CI 환경에서는 출력)
  silent: !process.env.CI,

  // 소스맵 확장 (빌드 시간 증가)
  widenClientFileUpload: true,

  // ad-blocker 방지를 위해 사용 (서버 비용 증가 시 제거)
  tunnelRoute: isProd,

  // Sentry.captureMessage 등 로깅 함수들을 번들 크기 감소를 위해 사용
  disableLogger: isProd,
});
