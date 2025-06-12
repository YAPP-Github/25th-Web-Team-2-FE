import { Metadata } from 'next';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

export const metadata: Metadata = {
  title: '그라밋 | 공고 조회',
  description: '그라밋 | 실험 공고 조회',
};

function DesktopPostLayout({ children }: { children: React.ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}

export default DesktopPostLayout;
