import { leavePageLayout } from './LeavePage.css';

import Footer from '@/components/Footer/Footer';
import BackHeader from '@/components/Header/BackHeader/BackHeader';
import UserLayout from '@/components/layout/UserLayout/UserLayout';

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
