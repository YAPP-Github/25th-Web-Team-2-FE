import Spinner from '@common/Spinner';

import { loginRedirectLayout } from './LoginPage.css';


export default function LoginPage() {
  return (
    <div className={loginRedirectLayout}>
      <Spinner />
      <span>로그인 페이지로 이동 중...</span>
    </div>
  );
}
