'use client';

import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';

import CustomQueryClientProvider from './QueryClientProvider';

import { setUserProperties, trackEvent } from '@/lib/mixpanelClient';
import MSWProvider from '@/mocks/MSWProvider';

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
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
        <CustomQueryClientProvider session={session}>{children}</CustomQueryClientProvider>
      </MSWProvider>
    </SessionProvider>
  );
}
