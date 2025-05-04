import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Session } from 'next-auth';
import { useState } from 'react';

import fetchClient from '@/apis/config/fetchClient';

const CustomQueryClientProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  const isClient = typeof window !== 'undefined';

  if (isClient && session?.accessToken) {
    fetchClient.onRequest((config) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${session.accessToken}`,
      };

      return config;
    });
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
