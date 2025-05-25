import Image from 'next/image';
import Link from 'next/link';

import { sloganContainer, loginCardContainer } from '../LoginPage.css';
import MobileLoginCard from './components/MobileLoginCard/MobileLoginCard';
import { mobileLoginPageLayout } from './MobileLoginPage.css';
import { mobileLoginCardContainer, tempText } from './MobileLoginPage.css';

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

          {/* TODO: 연구자 회원가입 구현 후 MobileLoginCard로 대치 */}
          <span className={tempText}>연구자 회원가입은 PC에서 진행해 주세요</span>
        </div>
      </section>
    </div>
  );
}
