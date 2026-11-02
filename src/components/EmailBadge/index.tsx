import Image from 'next/image';

import { LoginProvider } from '@/types/user';
import Google from '@assets/images/google.svg';
import Naver from '@assets/images/naver.svg';

import { emailWrapper, email } from './EmailBadge.css';


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
