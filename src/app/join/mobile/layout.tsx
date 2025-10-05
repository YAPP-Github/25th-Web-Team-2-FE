import type { Viewport } from 'next';

import { mobileJoinPageLayout } from '../JoinPage.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // maximumScale: 1,
  // userScalable: false,
};

export default function MobileJoinLayout({ children }: { children: React.ReactNode }) {
  return <div className={mobileJoinPageLayout}>{children}</div>;
}
