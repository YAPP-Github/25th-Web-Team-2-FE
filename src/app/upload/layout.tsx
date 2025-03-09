import { Metadata } from 'next';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

export const metadata: Metadata = {
  title: '그라밋 | 실험 공고 등록',
  description: '그라밋 | 실험 공고 등록',
};

function UploadLayout({ children }: { children: React.ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}

export default UploadLayout;
