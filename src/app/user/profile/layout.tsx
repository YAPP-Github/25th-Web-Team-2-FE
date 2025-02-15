import { profileLayout } from './ProfilePage.css';

import DefaultLayout from '@/components/layout/DefaultLayout/DefaultLayout';

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayout>
      <div className={profileLayout}>{children}</div>
    </DefaultLayout>
  );
}

export default ProfileLayout;
