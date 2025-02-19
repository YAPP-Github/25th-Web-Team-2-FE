import { Suspense } from 'react';

import { leaveSuccessPageLayout } from './success.css';

function LeaveSuccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={leaveSuccessPageLayout}>
      <Suspense>{children}</Suspense>
    </div>
  );
}

export default LeaveSuccessLayout;
