import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Session } from 'next-auth';
import { useState } from 'react';

import { API } from '@/apis/config';

const CustomQueryClientProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  const authorization = API.defaults.headers.common['Authorization'];

  if (session?.accessToken && typeof authorization === 'undefined') {
    API.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
