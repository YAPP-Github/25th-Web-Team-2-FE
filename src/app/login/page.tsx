import { loginRedirectLayout } from './LoginPage.css';

import Spinner from '@/components/Spinner/Spinner';

export default function LoginPage() {
  return (
    <div className={loginRedirectLayout}>
      <Spinner />
      <span>로그인 페이지로 이동 중...</span>
    </div>
  );
}
