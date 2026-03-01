import Image from 'next/image';

import { emailWrapper, email } from './EmailBadge.css';

import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import { LoginProvider } from '@/types/user';

const logoMap = {
  NAVER: Naver,
  GOOGLE: Google,
};

interface EmailBadgeProps {
  provider?: LoginProvider;
  oauthEmail?: string;
}

const EmailBadge = ({ provider, oauthEmail }: EmailBadgeProps) => {
  if (!provider || !oauthEmail) return null;

  return (
    <div className={emailWrapper}>
      <Image src={logoMap[provider]} alt="로고" width={24} height={24} />
      <span className={email}>{oauthEmail}</span>
    </div>
  );
};

export default EmailBadge;
