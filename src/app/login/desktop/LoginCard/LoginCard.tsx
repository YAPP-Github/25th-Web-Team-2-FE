'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  badge,
  buttonContainer,
  cardTitleContainer,
  loginButton,
  loginCardLayout,
} from './LoginCard.css';
import { descriptionWrapper } from '../../LoginPage.css';

import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import { ROLE } from '@/constants/config';
import { colors } from '@/styles/colors';
import { Role } from '@/types/user';

const roleMapper = {
  RESEARCHER: '연구자',
  PARTICIPANT: '참여자',
};

const PROVIDER = {
  google: 'GOOGLE',
  naver: 'NAVER',
};

interface LoginCardProps {
  role: Role;
  description: string[];
}

const LoginCard = ({ role, description }: LoginCardProps) => {
  const router = useRouter();

  const goToLoginGoogle = () => {
    const googleOauthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&state=${role}|${PROVIDER.google}`;
    router.push(googleOauthURL);
  };

  const goToLoginNaver = () => {
    const naverOauthURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_STATE}|${role}|${PROVIDER.naver}`;
    router.push(naverOauthURL);
  };

  return (
    <div className={loginCardLayout}>
      <div className={cardTitleContainer}>
        <div
          className={badge}
          style={assignInlineVars({
            '--badge-color': role === ROLE.researcher ? colors.secondaryPink : colors.primaryMint,
            '--badge-bg': role === ROLE.researcher ? colors.secondaryTinted : colors.primaryTinted,
          })}
        >
          {roleMapper[role]}
        </div>
        <div className={descriptionWrapper}>
          {description.map((text, idx) => (
            <span key={idx}>
              {text}
              <br />
            </span>
          ))}
        </div>
      </div>
      <div className={buttonContainer}>
        <button className={loginButton} onClick={goToLoginNaver}>
          <Image src={Naver} alt="네이버" width={24} height={24} />
          <span>네이버 계정으로 로그인</span>
        </button>
        <button className={loginButton} onClick={goToLoginGoogle}>
          <Image src={Google} alt="구글" width={24} height={24} />
          <span>구글 계정으로 로그인</span>
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
