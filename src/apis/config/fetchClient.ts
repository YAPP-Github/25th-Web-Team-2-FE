import { createBaseFetchClient, RequestProps } from './createBaseFetchClient';
import { retryLogin } from './utils';

/**
 * CSR 환경에서 사용하는 fetchClient
 *
 * @returns fetchClient
 *
 * @example 클라이언트 컴포넌트에서 사용
 * ```tsx
 * const isClient = typeof window !== 'undefined';
 *
 * if (isClient && session?.accessToken) {
 *   fetchClient.onRequest((config) => {
 *     config.headers = {
 *       ...config.headers,
 *       Authorization: `Bearer ${session.accessToken}`,
 *     };
 *     return config;
 *   });
 * }
 */
export const fetchClient = createBaseFetchClient({
  retryLogin: async ({ config, code, status, url }) => {
    return await retryLogin({ fetchClient, config, code, status, url });
  },
});

/**
 * SSR 환경에서 사용하는 fetchClient
 *
 * @param accessToken
 * @returns fetchClient
 *
 * @example 서버 컴포넌트에서 사용
 * ```tsx
 * import { createSSRFetchClient } from '@/apis/config/fetchClient';
 * import { getServerSession } from 'next-auth/next';
 *
 * export default async function Page() {
 *   const session = await getServerSession(authOptions);
 *   const fetchClient = createSSRFetchClient(session?.accessToken);
 *   const data = await fetchClient.get(url);
 *   // ...
 * }
 * ```
 */
export const createSSRFetchClient = (accessToken?: string) => {
  return createBaseFetchClient({
    onRequest: (config: RequestProps) => {
      if (accessToken) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
      return config;
    },
  });
};

/**
 * retryLogin 없는 fetchClient
 * @description 토큰 재발급 시 무한 루프 방지를 위해 retryLogin 없는 fetchClient 생성
 */
export const refreshClient = createBaseFetchClient();
