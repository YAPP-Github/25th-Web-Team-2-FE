import { leavePageLayout } from './LeavePage.css';

import UserLayout from '@/components/layout/UserLayout/UserLayout';

function LeaveLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserLayout>
      <div className={leavePageLayout}>{children}</div>
    </UserLayout>
  );
}

export default LeaveLayout;
