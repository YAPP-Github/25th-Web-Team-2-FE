import { Metadata } from 'next';

import UploadFunnelLayout from '@/components/layout/UploadFunnelLayout/UploadFunnelLayout';

export const metadata: Metadata = {
  title: '그라밋 | 실험 공고 등록',
  description: '그라밋 | 실험 공고 등록',
};

function UploadLayout({ children }: { children: React.ReactNode }) {
  return <UploadFunnelLayout>{children}</UploadFunnelLayout>;
}

export default UploadLayout;
