import * as Sentry from '@sentry/nextjs';

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1,
    enableLogs: true,
    debug: false,
  });
}
