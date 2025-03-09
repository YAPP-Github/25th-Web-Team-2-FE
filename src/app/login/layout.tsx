import { Metadata } from 'next';

import { loginLayout } from './LoginPage.css';

export const metadata: Metadata = {
  title: '그라밋 | 로그인',
  description: '그라밋 | 로그인',
};

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className={loginLayout}>{children}</div>;
}

export default LoginLayout;
