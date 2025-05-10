import { Metadata } from 'next';
import { headers } from 'next/headers';
import { Suspense } from 'react';

import DesktopJoinLayout from './desktop/layout';
import MobileJoinLayout from './mobile/layout';

export const metadata: Metadata = {
  title: '그라밋 | 회원가입',
  description: '그라밋 | 회원가입',
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  return isMobile ? (
    <MobileJoinLayout>
      <Suspense>{children}</Suspense>
    </MobileJoinLayout>
  ) : (
    <DesktopJoinLayout>
      <Suspense>{children}</Suspense>
    </DesktopJoinLayout>
  );
}
