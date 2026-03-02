import BackHeader from '@components/Header/BackHeader';

function MobileProfileEditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackHeader />
      {children}
    </>
  );
}

export default MobileProfileEditLayout;
