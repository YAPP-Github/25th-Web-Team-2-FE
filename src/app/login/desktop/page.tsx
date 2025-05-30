import Image from 'next/image';
import Link from 'next/link';

import {
  loginPageLayout,
  sloganContainer,
  sloganWrapper,
  loginCardContainer,
} from '../LoginPage.css';
import LoginCard from './LoginCard/LoginCard';

import Logo from '@/assets/images/logo.svg';
import { ROLE } from '@/constants/config';

export default function LoginDesktopPage() {
  const SLOGAN = '작은 연결로 시작되는 큰 발견\n그라밋이 도울게요';

  return (
    <div className={loginPageLayout}>
      <section className={sloganContainer}>
        <Link href="/" aria-label="홈 화면으로 이동">
          <Image src={Logo} alt="로고" />
        </Link>
        <h1 className={sloganWrapper}>{SLOGAN}</h1>
      </section>
      <section className={loginCardContainer}>
        <LoginCard
          role={ROLE.researcher}
          description={['그라밋에서 손쉽게', '연구 참여자를 모아보세요']}
        />
        <LoginCard
          role={ROLE.participant}
          description={['정보를 등록하면', '딱 맞는 실험을 찾아드려요']}
        />
      </section>
    </div>
  );
}
