'use client';

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
import LastLoginTooltip from '../../../components/LastLoginTooltip/LastLoginTooltip';

import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import { ROLE } from '@/constants/config';
import { CLICK_LOGIN_PARTICIPANT, CLICK_LOGIN_RESEARCHER } from '@/lib/mixpanel/signupEvents';
import { trackEvent } from '@/lib/mixpanelClient';
import { Role } from '@/types/user';

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
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&state=${role}|${PROVIDER.google}`;
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_STATE}|${role}|${PROVIDER.naver}`;

  const handleNaverClick = () => {
    const eventName = role === ROLE.researcher ? CLICK_LOGIN_RESEARCHER : CLICK_LOGIN_PARTICIPANT;
    trackEvent(eventName, { provider: PROVIDER.naver });
  };

  const handleGoogleClick = () => {
    const eventName = role === ROLE.researcher ? CLICK_LOGIN_RESEARCHER : CLICK_LOGIN_PARTICIPANT;
    trackEvent(eventName, { provider: PROVIDER.google });
  };

  return (
    <div className={mobileLoginCard}>
      <div className={titleContainer}>
        <h2 className={titleText}>{roleMapper[role]}</h2>
        <h3 className={subTitleText}>{description}</h3>
      </div>

      <div className={buttonContainer}>
        <LastLoginTooltip role={role} provider={PROVIDER.naver} side="bottom">
          <Link href={naverLoginUrl} onClick={handleNaverClick}>
            <div className={loginButton}>
              <LastLoginTooltip.Trigger>
                <Image src={Naver} alt="naver" width={24} height={24} />
              </LastLoginTooltip.Trigger>
              <span className={loginButtonText}>네이버 로그인</span>
            </div>
          </Link>
        </LastLoginTooltip>
        <div className={verticalLine} />
        <LastLoginTooltip role={role} provider={PROVIDER.google} side="bottom">
          <Link href={googleLoginUrl} onClick={handleGoogleClick}>
            <div className={loginButton}>
              <LastLoginTooltip.Trigger>
                <Image src={Google} alt="google" width={24} height={24} />
              </LastLoginTooltip.Trigger>
              <span className={loginButtonText}>구글 로그인</span>
            </div>
          </Link>
        </LastLoginTooltip>
      </div>
    </div>
  );
};

export default MobileLoginCard;
