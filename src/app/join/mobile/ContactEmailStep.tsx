import Image from 'next/image';

import {
  email,
  emailWrapper,
  title,
  description,
  emailInput,
  mainContainer,
  emailTitleContainer,
  titleContainer,
} from './page.css';

import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import { LoginProvider, Role } from '@/types/user';

interface ContactEmailStepProps {
  role?: Role;
  provider?: LoginProvider;
  oauthEmail?: string;
}

const logoMap = {
  NAVER: Naver,
  GOOGLE: Google,
};

const ContactEmailStep = ({ role, provider, oauthEmail }: ContactEmailStepProps) => {
  const titleText = '연락 받을 이메일을 입력해 주세요';
  const descriptionText = '로그인 아이디와 달라도 괜찮아요';

  if (!role || !provider) {
    return null;
  }

  return (
    <main className={mainContainer}>
      <div className={emailTitleContainer}>
        <div className={titleContainer}>
          <h2 className={title}>{titleText}</h2>
          <h3 className={description}>{descriptionText}</h3>
        </div>
        <div className={emailWrapper}>
          <Image src={logoMap[provider]} alt="로고" width={24} height={24} />
          <span className={email}>{oauthEmail}</span>
        </div>
      </div>

      {/* ButtonInput */}
      <input type="email" placeholder="이메일 입력" className={emailInput} />
    </main>
  );
};

export default ContactEmailStep;
