import Image from 'next/image';
import Link from 'next/link';

import { sloganContainer, loginCardContainer } from '../LoginPage.css';
import MobileLoginCard from './components/MobileLoginCard/MobileLoginCard';
import { mobileLoginPageLayout } from './MobileLoginPage.css';
import { mobileLoginCardContainer } from './MobileLoginPage.css';

import Logo from '@/assets/images/logo.svg';
import { ROLE } from '@/constants/config';

export default function MobileLoginPage() {
  return (
    <div className={mobileLoginPageLayout}>
      <section className={sloganContainer}>
        <Link href="/" aria-label="홈 화면으로 이동">
          <Image src={Logo} alt="로고" height={40} priority />
        </Link>
      </section>
      <section className={loginCardContainer}>
        <div className={mobileLoginCardContainer}>
          <MobileLoginCard
            role={ROLE.participant}
            description="정보를 등록하면 딱 맞는 실험을 찾아드려요"
          />
          <MobileLoginCard
            role={ROLE.researcher}
            description="그라밋에서 손쉽게 연구 참여자를 모아보세요"
          />
        </div>
      </section>
    </div>
  );
}
