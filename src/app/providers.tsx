'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { setUserProperties, trackEvent } from '@/lib/mixpanelClient';
import MSWProvider from '@/mocks/MSWProvider';

function makeQueryClient() {
  return new QueryClient();
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageTitle = document.title;

      trackEvent('Page Viewed', { page: pageTitle, path: pathname });
      setUserProperties({ last_visited_page: pageTitle });
    }
  }, [pathname]);

  return (
    <MSWProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MSWProvider>
  );
}
