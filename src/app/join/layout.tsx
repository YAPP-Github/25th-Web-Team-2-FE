import { Metadata } from 'next';
import { Suspense } from 'react';

import { joinPageLayout } from './JoinPage.css';

export const metadata: Metadata = {
  title: '그라밋 | 회원가입',
  description: '그라밋 | 회원가입',
};

function JoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={joinPageLayout}>
      <Suspense>{children}</Suspense>
    </div>
  );
}

export default JoinLayout;
