'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  buttonContainer,
  loginButton,
  loginButtonRecentGoogle,
  loginButtonRecentNaver,
  loginButtonText,
  mobileLoginCard,
  recentLoginBadge,
  subTitleText,
  titleContainer,
  titleText,
  verticalLine,
} from './MobileLoginCard.css';

import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import { ROLE } from '@/constants/config';
import { localStorageManager, STORAGE_KEYS } from '@/lib/localStorageManager';
import { CLICK_LOGIN_PARTICIPANT, CLICK_LOGIN_RESEARCHER } from '@/lib/mixpanel/signupEvents';
import { trackEvent } from '@/lib/mixpanelClient';
import { LoginProvider, Role } from '@/types/user';

const roleMapper = {
  RESEARCHER: '연구자',
  PARTICIPANT: '참여자',
};

const PROVIDER = {
  google: 'GOOGLE',
  naver: 'NAVER',
} as const;

interface MobileLoginCardProps {
  role: Role;
  description: string;
}

const MobileLoginCard = ({ role, description }: MobileLoginCardProps) => {
  const [lastProvider, setLastProvider] = useState<LoginProvider | null>(null);

  const isRecentGoogle = lastProvider === PROVIDER.google;
  const isRecentNaver = lastProvider === PROVIDER.naver;

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&state=${role}|${PROVIDER.google}`;
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_STATE}|${role}|${PROVIDER.naver}`;

  const handleNaverClick = () => {
    const eventName = role === ROLE.researcher ? CLICK_LOGIN_RESEARCHER : CLICK_LOGIN_PARTICIPANT;
    trackEvent(eventName, { provider: 'naver' });
    localStorageManager.set(STORAGE_KEYS.lastLogin, { role, provider: PROVIDER.naver });
  };

  const handleGoogleClick = () => {
    const eventName = role === ROLE.researcher ? CLICK_LOGIN_RESEARCHER : CLICK_LOGIN_PARTICIPANT;
    trackEvent(eventName, { provider: 'google' });
    localStorageManager.set(STORAGE_KEYS.lastLogin, { role, provider: PROVIDER.google });
  };

  useEffect(() => {
    const data = localStorageManager.get(STORAGE_KEYS.lastLogin);
    if (data?.role === role) setLastProvider(data.provider);
  }, [role]);

  return (
    <div className={mobileLoginCard}>
      <div className={titleContainer}>
        <h2 className={titleText}>{roleMapper[role]}</h2>
        <h3 className={subTitleText}>{description}</h3>
      </div>

      <div className={buttonContainer}>
        <Link href={naverLoginUrl} onClick={handleNaverClick}>
          <div
            className={[loginButton, isRecentNaver ? loginButtonRecentNaver : '']
              .filter(Boolean)
              .join(' ')}
          >
            {isRecentNaver && <span className={recentLoginBadge}>최근 로그인</span>}
            <Image src={Naver} alt="naver" width={24} height={24} />
            <span className={loginButtonText}>네이버 로그인</span>
          </div>
        </Link>
        <div className={verticalLine} />
        <Link href={googleLoginUrl} onClick={handleGoogleClick}>
          <div
            className={[loginButton, isRecentGoogle ? loginButtonRecentGoogle : '']
              .filter(Boolean)
              .join(' ')}
          >
            {isRecentGoogle && <span className={recentLoginBadge}>최근 로그인</span>}
            <Image src={Google} alt="google" width={24} height={24} />
            <span className={loginButtonText}>구글 로그인</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MobileLoginCard;
