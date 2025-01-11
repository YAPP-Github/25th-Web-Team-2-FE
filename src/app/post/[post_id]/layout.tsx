'use client';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

function PostLayout({ children }: { children: React.ReactNode }) {
  return <DefaultLayout>{children}</DefaultLayout>;
}

export default PostLayout;
