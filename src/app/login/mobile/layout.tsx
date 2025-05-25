import { Metadata } from 'next';

import LoginError from '../components/LoginError/LoginError';
import { mobileLoginLayout } from '../LoginPage.css';

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
