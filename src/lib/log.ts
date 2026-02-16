import * as Sentry from '@sentry/nextjs';

import { APIErrorResponse } from '@/apis/config/types';

interface LogAPIErrorProps {
  error: APIErrorResponse;
  level: Sentry.SeverityLevel;
  httpStatus: number;
  url: string;
}

interface LogNetworkErrorProps {
  error: Error;
  url: string;
}

interface LogUnhandledErrorProps {
  error: Error;
  url: string;
}

const isProduction = process.env.NODE_ENV === 'production';

export const logAPIError = ({ error, level, httpStatus, url }: LogAPIErrorProps) => {
  if (!isProduction) return;

  Sentry.withScope((scope) => {
    scope.setLevel(level);
    scope.setTag('api', 'apiError');
    scope.setTag('errorCode', error.code);
    scope.setTag('httpStatus', httpStatus.toString());
    scope.setTag('endpoint', url);
    scope.setContext('apiError', {
      error,
    });

    Sentry.captureException(new Error(error.message));
  });
};

export const logNetworkError = ({ error, url }: LogNetworkErrorProps) => {
  if (!isProduction) return;

  Sentry.withScope((scope) => {
    scope.setLevel('warning');
    scope.setTag('api', 'networkError');
    scope.setTag('endpoint', url);
    scope.setContext('networkError', {
      error,
    });

    Sentry.captureException(new Error('네트워크가 불안정해요. 다시 시도해주세요!'));
  });
};

export const logUnhandledError = ({ error, url }: LogUnhandledErrorProps) => {
  if (!isProduction) return;

  Sentry.withScope((scope) => {
    scope.setLevel('fatal');
    scope.setTag('api', 'unhandledError');
    scope.setTag('endpoint', url);
    scope.setContext('unhandledError', {
      error,
    });

    Sentry.captureException(new Error('예기치 못한 에러가 발생했어요. 관리자에게 문의 바랍니다.'));
  });
};
