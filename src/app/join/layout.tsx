import { Suspense } from 'react';

import { joinPageLayout } from './JoinPage.css';

function JoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={joinPageLayout}>
      <Suspense>{children}</Suspense>
    </div>
  );
}

export default JoinLayout;
