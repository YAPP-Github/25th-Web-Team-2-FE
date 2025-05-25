import { Metadata } from 'next';

import { mobileLoginLayout } from '../LoginPage.css';
import LoginError from '../components/LoginError/LoginError';

export const metadata: Metadata = {
  title: '그라밋 | 로그인 | 모바일',
  description: '그라밋 | 로그인 | 모바일',
};

export default function MobileLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoginError>
      <div className={mobileLoginLayout}>{children}</div>
    </LoginError>
  );
}
