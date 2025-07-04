import { Metadata } from 'next';

import { profilePageLayout } from './ProfilePage.css';

import Footer from '@/components/Footer/Footer';
import UserLayout from '@/components/layout/UserLayout/UserLayout';

export const metadata: Metadata = {
  title: '그라밋 | 회원 정보',
  description: '그라밋 | 회원 정보',
};

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserLayout>
      <div className={profilePageLayout}>{children}</div>
      <Footer />
    </UserLayout>
  );
}

export default ProfileLayout;
