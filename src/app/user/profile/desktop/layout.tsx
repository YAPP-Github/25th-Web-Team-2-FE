import { profilePageLayout } from '../ProfilePage.css';

import Footer from '@/components/Footer/Footer';
import UserLayout from '@/components/layout/UserLayout/UserLayout';

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserLayout>
      <div className={profilePageLayout}>{children}</div>
      <Footer />
    </UserLayout>
  );
}

export default ProfileLayout;
