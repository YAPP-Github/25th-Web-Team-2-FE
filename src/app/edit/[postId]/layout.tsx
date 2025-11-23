import { Metadata } from 'next';

import UploadFunnelLayout from '@/components/layout/UploadFunnelLayout/UploadFunnelLayout';

export const metadata: Metadata = {
  title: '그라밋 | 공고 수정',
  description: '그라밋 | 공고 수정',
};

function EditLayout({ children }: { children: React.ReactNode }) {
  return <UploadFunnelLayout>{children}</UploadFunnelLayout>;
}

export default EditLayout;
