import * as Sentry from '@sentry/nextjs';

const isProductionDomain = process.env.VERCEL_ENV === 'production';

if (isProductionDomain) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1,
    enableLogs: true,
    debug: false,
  });
}
