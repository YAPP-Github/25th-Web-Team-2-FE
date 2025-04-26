'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';

import { API } from '@/apis/config';
import { setUserProperties, trackEvent } from '@/lib/mixpanelClient';
import MSWProvider from '@/mocks/MSWProvider';

function makeQueryClient(session: Session | null) {
  if (session?.accessToken) {
    API.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`;
  }

  return new QueryClient();
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(session: Session | null) {
  if (isServer) {
    return makeQueryClient(session);
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient(session);
    return browserQueryClient;
  }
}

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const queryClient = getQueryClient(session);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageTitle = document.title;

      trackEvent('Page Viewed', { page: pageTitle, path: pathname });
      setUserProperties({ last_visited_page: pageTitle });
    }
  }, [pathname]);

  return (
    <SessionProvider session={session}>
      <MSWProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MSWProvider>
    </SessionProvider>
  );
}
