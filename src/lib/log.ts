import * as Sentry from '@sentry/nextjs';

interface LogAPIErrorProps {
  level: Sentry.SeverityLevel;
  errorCode: string;
  httpStatus: number;
  url: string;
  errorMessage: string;
}

interface LogNetworkErrorProps {
  url: string;
}

interface LogUnhandledErrorProps {
  url: string;
}

const isProductionDomain = process.env.VERCEL_ENV === 'production';

export const logAPIError = ({
  level,
  errorCode,
  httpStatus,
  url,
  errorMessage,
}: LogAPIErrorProps) => {
  if (!isProductionDomain) return;

  Sentry.withScope((scope) => {
    scope.setLevel(level);
    scope.setTag('api', 'apiError');
    scope.setTag('errorCode', errorCode);
    scope.setTag('httpStatus', httpStatus.toString());
    scope.setTag('endpoint', url);

    Sentry.captureException(new Error(errorMessage));
  });
};

export const logNetworkError = ({ url }: LogNetworkErrorProps) => {
  if (!isProductionDomain) return;

  Sentry.withScope((scope) => {
    scope.setLevel('warning');
    scope.setTag('api', 'networkError');
    scope.setTag('endpoint', url);

    Sentry.captureException(new Error('네트워크가 불안정해요. 다시 시도해주세요!'));
  });
};

export const logUnhandledError = ({ url }: LogUnhandledErrorProps) => {
  if (!isProductionDomain) return;

  Sentry.withScope((scope) => {
    scope.setLevel('fatal');
    scope.setTag('api', 'unhandledError');
    scope.setTag('endpoint', url);

    Sentry.captureException(new Error('예기치 못한 에러가 발생했어요. 관리자에게 문의 바랍니다.'));
  });
};
