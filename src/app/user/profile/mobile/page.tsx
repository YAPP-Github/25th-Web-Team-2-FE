'use client';

import MobileProfileHeader from './components/MobileProfileHeader/MobileProfileHeader';
import MobileProfileSection from './components/MobileProfileSection/MobileProfileSection';
import MobileUserInfoSection from './components/MobileUserInfoSection/MobileUserInfoSection';

const MobileProfilePage = () => {
  return (
    <>
      <MobileProfileHeader />
      <MobileUserInfoSection />
      <MobileProfileSection />
    </>
  );
};

export default MobileProfilePage;
