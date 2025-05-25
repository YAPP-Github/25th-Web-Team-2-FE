import Image from 'next/image';
import Link from 'next/link';

import {
  buttonContainer,
  loginButton,
  loginButtonText,
  mobileLoginCard,
  subTitleText,
  titleContainer,
  titleText,
  verticalLine,
} from './MobileLoginCard.css';

import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import { Role } from '@/types/user';

const roleMapper = {
  RESEARCHER: '연구자',
  PARTICIPANT: '참여자',
};

const PROVIDER = {
  google: 'GOOGLE',
  naver: 'NAVER',
};

interface MobileLoginCardProps {
  role: Role;
  description: string;
}

const MobileLoginCard = ({ role, description }: MobileLoginCardProps) => {
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&state=${role}|${PROVIDER.google}`;
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_STATE}|${role}|${PROVIDER.naver}`;

  return (
    <div className={mobileLoginCard}>
      <div className={titleContainer}>
        <h2 className={titleText}>{roleMapper[role]}</h2>
        <h3 className={subTitleText}>{description}</h3>
      </div>

      <div className={buttonContainer}>
        <Link href={naverLoginUrl}>
          <div className={loginButton}>
            <Image src={Naver} alt="naver" width={30} height={30} />
            <span className={loginButtonText}>네이버 로그인</span>
          </div>
        </Link>
        <div className={verticalLine} />
        <Link href={googleLoginUrl}>
          <div className={loginButton}>
            <Image src={Google} alt="google" width={30} height={30} />
            <span className={loginButtonText}>구글 로그인</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileLoginCard;
