import { profilePageLayout } from '../ProfilePage.css';

function MobileProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default MobileProfileLayout;
