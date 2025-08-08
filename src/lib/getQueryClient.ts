// https://tanstack.com/query/latest/docs/framework/react/examples/nextjs-app-prefetching?path=examples/react/nextjs-app-prefetching/app/get-query-client.ts
import { isServer, QueryClient } from '@tanstack/react-query';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
