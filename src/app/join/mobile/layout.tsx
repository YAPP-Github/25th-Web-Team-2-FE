import { mobileJoinPageLayout } from '../JoinPage.css';

export default function MobileJoinLayout({ children }: { children: React.ReactNode }) {
  return <div className={mobileJoinPageLayout}>{children}</div>;
}
