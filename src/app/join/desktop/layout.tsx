import { desktopJoinPageLayout } from '../JoinPage.css';

export default function DesktopJoinLayout({ children }: { children: React.ReactNode }) {
  return <div className={desktopJoinPageLayout}>{children} </div>;
}
