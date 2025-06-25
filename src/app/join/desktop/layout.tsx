import { desktopJoinPageLayout } from '../JoinPage.css';

import Footer from '@/components/Footer/Footer';

export default function DesktopJoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={desktopJoinPageLayout}>
      {children} <Footer />
    </div>
  );
}
