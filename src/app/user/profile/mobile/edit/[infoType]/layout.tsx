import BackHeader from '@/components/Header/BackHeader/BackHeader';

function MobileProfileEditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackHeader />
      {children}
    </>
  );
}

export default MobileProfileEditLayout;
