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

import { getOAuthLoginConfig } from '@/app/login/utils/getOAuthLoginConfig';
import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import { LOGIN_PROVIDER } from '@/constants/config';
import { Role } from '@/types/user';

const roleMapper = {
  RESEARCHER: '연구자',
  PARTICIPANT: '참여자',
};

interface MobileLoginCardProps {
  role: Role;
  description: string;
}

const MobileLoginCard = ({ role, description }: MobileLoginCardProps) => {
  const { googleOauthUrl, naverOauthUrl, handleGoogleLogin, handleNaverLogin } =
    getOAuthLoginConfig(role);

  return (
    <div className={mobileLoginCard}>
      <div className={titleContainer}>
        <h2 className={titleText}>{roleMapper[role]}</h2>
        <h3 className={subTitleText}>{description}</h3>
      </div>

      <div className={buttonContainer}>
        <LastLoginTooltip role={role} provider={LOGIN_PROVIDER.naver} side="bottom">
          <Link href={naverOauthUrl} onClick={handleNaverLogin}>
            <div className={loginButton}>
              <LastLoginTooltip.Trigger>
                <Image src={Naver} alt="naver" width={24} height={24} />
              </LastLoginTooltip.Trigger>
              <span className={loginButtonText}>네이버 로그인</span>
            </div>
          </Link>
        </LastLoginTooltip>
        <div className={verticalLine} />
        <LastLoginTooltip role={role} provider={LOGIN_PROVIDER.google} side="bottom">
          <Link href={googleOauthUrl} onClick={handleGoogleLogin}>
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
