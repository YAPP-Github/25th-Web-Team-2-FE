import Image from 'next/image';

import {
  email,
  emailWrapper,
  headerTitle,
  title,
  description,
  headerWrapper,
  progressBar,
  emailInput,
  layout,
  mainContainer,
  emailTitleContainer,
  titleContainer,
} from './page.css';

import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

// session 필요
// role에 따라 분기 처리: 연구자 / 침여자 회원가입
// provider에 따라 이메일 로고 분기 처리: 구글 / 네이버
const MobileJoinPage = () => {
  return (
    <div className={layout}>
      <header className={headerWrapper}>
        <Icon icon="Chevron" width={20} height={20} color={colors.text06} rotate={90} />
        <h1 className={headerTitle}>연구자 회원가입</h1>
      </header>

      {/* 프로그래스 바 */}
      <div className={progressBar}></div>

      <main className={mainContainer}>
        <div className={emailTitleContainer}>
          <div className={titleContainer}>
            <h2 className={title}>연락 받을 이메일을 입력해 주세요</h2>
            <h3 className={description}>로그인 아이디와 달라도 괜찮아요</h3>
          </div>
          <div className={emailWrapper}>
            <Image src={Naver} alt="로고" width={24} height={24} />
            <span className={email}>Gradmeet123@naver.com</span>
          </div>
        </div>

        {/* ButtonInput */}
        <input type="email" placeholder="이메일 입력" className={emailInput} />
      </main>
    </div>
  );
};

export default MobileJoinPage;
