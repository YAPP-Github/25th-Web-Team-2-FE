import { Metadata } from 'next';

import { profilePageLayout } from './ProfilePage.css';

import UserLayout from '@/components/layout/UserLayout/UserLayout';

export const metadata: Metadata = {
  title: '그라밋 | 회원 정보',
  description: '그라밋 | 회원 정보',
};

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserLayout>
      <div className={profilePageLayout}>{children}</div>
    </UserLayout>
  );
}

export default ProfileLayout;
