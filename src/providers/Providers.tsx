'use client';

import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';

import CustomQueryClientProvider from './CustomQueryClientProvider';
import { OverlayProvider } from './OverlayProvider';
import ToastProvider from './ToastProvider';

import { setUserProperties, trackEvent } from '@/lib/mixpanelClient';
import MSWProvider from '@/providers/MSWProvider';

const POST_DETAIL_PATH_PATTERN = /^\/post\/[^/]+/;
const PAGE_NAME_POST_DETAIL = '그라밋 | 공고 조회';

const getPageTitleForAnalytics = (pathname: string) => {
  if (POST_DETAIL_PATH_PATTERN.test(pathname)) {
    return PAGE_NAME_POST_DETAIL;
  }

  return document.title;
};

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
      const pageTitle = getPageTitleForAnalytics(pathname);

      trackEvent('Page Viewed', { page: pageTitle, path: pathname });
      setUserProperties({ last_visited_page: pageTitle });
    }
  }, [pathname]);

  return (
    <SessionProvider session={session}>
      <MSWProvider>
        <CustomQueryClientProvider session={session}>
          <ToastProvider>
            <OverlayProvider>{children}</OverlayProvider>
          </ToastProvider>
        </CustomQueryClientProvider>
      </MSWProvider>
    </SessionProvider>
  );
}
