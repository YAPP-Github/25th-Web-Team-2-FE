import { getServerSession } from 'next-auth';
import MobileProfileSection from './components/MobileProfileSection/MobileProfileSection';
import MobileUserInfoSection from './components/MobileUserInfoSection/MobileUserInfoSection';
import { authOptions } from '@/lib/auth-utils';
import { ROLE } from '@/constants/config';
import MobileProfileHeader from './components/MobileProfileHeader/MobileProfileHeader';

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
