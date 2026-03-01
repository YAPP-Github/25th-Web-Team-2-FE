import MobileProfileHeader from './components/MobileProfileHeader';
import MobileProfileSection from './components/MobileProfileSection';
import MobileUserInfoSection from './components/MobileUserInfoSection';

interface MobileProfilePageProps {
  searchParams: {
    tab?: string;
  };
}

const MobileProfilePage = async ({ searchParams }: MobileProfilePageProps) => {
  return (
    <>
      <MobileProfileHeader />
      <MobileUserInfoSection />
      <MobileProfileSection defaultTab={searchParams.tab} />
    </>
  );
};

export default MobileProfilePage;
