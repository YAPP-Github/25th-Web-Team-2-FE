import { getServerSession } from 'next-auth';

import MobileProfileHeader from './components/MobileProfileHeader/MobileProfileHeader';
import MobileProfileSection from './components/MobileProfileSection/MobileProfileSection';
import MobileUserInfoSection from './components/MobileUserInfoSection/MobileUserInfoSection';

import { ROLE } from '@/constants/config';
import { authOptions } from '@/lib/auth-utils';

const MobileProfilePage = async () => {
  const session = await getServerSession(authOptions);

  const role = session?.role;

  if (role === ROLE.participant) {
    return (
      <>
        <MobileProfileHeader />
        <MobileUserInfoSection />
        <MobileProfileSection />
      </>
    );
  }
};

export default MobileProfilePage;
