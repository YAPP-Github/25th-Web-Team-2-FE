import Link from 'next/link';

import { PATH } from '@constants/path';

import { loginButton } from './LoginButton.css';


const LoginButton = () => {
  return (
    <Link href={PATH.login} className={loginButton}>
      로그인
    </Link>
  );
};

export default LoginButton;
