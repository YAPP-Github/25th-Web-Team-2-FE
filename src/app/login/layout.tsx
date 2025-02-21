import { loginLayout } from './LoginPage.css';

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className={loginLayout}>{children}</div>;
}

export default LoginLayout;
