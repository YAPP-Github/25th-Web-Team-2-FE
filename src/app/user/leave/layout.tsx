
import Footer from '@components/Footer';
import BackHeader from '@components/Header/BackHeader';
import UserLayout from '@components/layout/UserLayout';

import { leavePageLayout } from './LeavePage.css';

function LeaveLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserLayout>
      <BackHeader />
      <div className={leavePageLayout}>{children}</div>
      <Footer />
    </UserLayout>
  );
}

export default LeaveLayout;
