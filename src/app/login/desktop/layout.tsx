import { Metadata } from 'next';

import LoginError from '../components/LoginError/LoginError';
import { contentLayout, loginLayout } from '../LoginPage.css';

import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: '그라밋 | 로그인',
  description: '그라밋 | 로그인',
};

export default function DesktopLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoginError>
      <div className={loginLayout}>
        <main className={contentLayout}>{children}</main>
        <Footer />
      </div>
    </LoginError>
  );
}
