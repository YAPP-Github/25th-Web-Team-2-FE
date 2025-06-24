import { Metadata } from 'next';

import MobilePostDetailLayout from '@/components/layout/MobilePostDetailLayout/MobilePostDetailLayout';

export const metadata: Metadata = {
  title: '그라밋 | 공고 조회',
  description: '그라밋 | 실험 공고 조회',
};

function MobilePostLayout({ children }: { children: React.ReactNode }) {
  return <MobilePostDetailLayout>{children}</MobilePostDetailLayout>;
}

export default MobilePostLayout;
