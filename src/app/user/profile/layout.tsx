import { profilePageLayout } from './ProfilePage.css';

import UserLayout from '@/components/layout/UserLayout/UserLayout';

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserLayout>
      <div className={profilePageLayout}>{children}</div>
    </UserLayout>
  );
}

export default ProfileLayout;
