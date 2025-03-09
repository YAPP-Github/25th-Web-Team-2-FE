import Image from 'next/image';
import Link from 'next/link';

import LoginCard from './components/LoginCard/LoginCard';
import LoginError from './LoginError';
import {
  loginPageLayout,
  sloganContainer,
  sloganWrapper,
  loginCardContainer,
} from './LoginPage.css';

import Logo from '@/assets/images/logo.svg';

export default function LoginPage() {
  return (
    <LoginError>
      <div className={loginPageLayout}>
        <div className={sloganContainer}>
          <Link href="/" aria-label="홈 화면으로 이동">
            <Image src={Logo} alt="로고" />
          </Link>
          <div className={sloganWrapper}>
            <span>작은 연결로 시작되는 큰 발견</span>
            <br />
            <span>그라밋이 도울게요</span>
          </div>
        </div>
        <div className={loginCardContainer}>
          <LoginCard
            role="연구자"
            description={['그라밋에서 손쉽게', '연구 참여자를 모아보세요']}
          />
          <LoginCard role="참여자" description={['정보를 등록하면', '딱 맞는 실험을 찾아드려요']} />
        </div>
      </div>
    </LoginError>
  );
}
