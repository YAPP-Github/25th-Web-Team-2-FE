
import Footer from '@components/Footer';
import Header from '@components/Header';
import UserLayout from '@components/layout/UserLayout';

import { profilePageLayout } from '../ProfilePage.css';

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserLayout>
      <Header />
      <div className={profilePageLayout}>{children}</div>
      <Footer />
    </UserLayout>
  );
}

export default ProfileLayout;
