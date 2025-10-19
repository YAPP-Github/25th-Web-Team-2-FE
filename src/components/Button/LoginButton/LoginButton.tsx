import Link from 'next/link';

import { loginButton } from './LoginButton.css';

import { PATH } from '@/constants/path';

const LoginButton = () => {
  return (
    <Link href={PATH.login} className={loginButton}>
      로그인
    </Link>
  );
};

export default LoginButton;
