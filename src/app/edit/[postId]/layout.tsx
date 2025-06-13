import { Metadata } from 'next';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

export const metadata: Metadata = {
  title: '그라밋 | 공고 수정',
  description: '그라밋 | 공고 수정',
};

function EditLayout({ children }: { children: React.ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}

export default EditLayout;
