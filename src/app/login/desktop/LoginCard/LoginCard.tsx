'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import {
  badge,
  buttonContainer,
  cardTitleContainer,
  loginButton,
  loginCardLayout,
} from './LoginCard.css';
import LastLoginTooltip from '../../components/LastLoginTooltip/LastLoginTooltip';
import { descriptionWrapper } from '../../LoginPage.css';
import { getOAuthLoginConfig } from '../../LoginPage.utils';

import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import { LOGIN_PROVIDER, ROLE } from '@/constants/config';
import { colors } from '@/styles/colors';
import { Role } from '@/types/user';

const roleMapper = {
  RESEARCHER: '연구자',
  PARTICIPANT: '참여자',
};

interface LoginCardProps {
  role: Role;
  description: string[];
}

const LoginCard = ({ role, description }: LoginCardProps) => {
  const { googleOauthUrl, naverOauthUrl, handleGoogleLogin, handleNaverLogin } =
    getOAuthLoginConfig(role);

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
        <LastLoginTooltip role={role} provider={LOGIN_PROVIDER.naver} side="top">
          <Link href={naverOauthUrl} className={loginButton} onClick={handleNaverLogin}>
            <LastLoginTooltip.Trigger>
              <Image src={Naver} alt="네이버" width={24} height={24} />
            </LastLoginTooltip.Trigger>
            <span>네이버 계정으로 로그인</span>
          </Link>
        </LastLoginTooltip>
        <LastLoginTooltip role={role} provider={LOGIN_PROVIDER.google} side="bottom">
          <Link href={googleOauthUrl} className={loginButton} onClick={handleGoogleLogin}>
            <LastLoginTooltip.Trigger>
              <Image src={Google} alt="구글" width={24} height={24} />
            </LastLoginTooltip.Trigger>
            <span>구글 계정으로 로그인</span>
          </Link>
        </LastLoginTooltip>
      </div>
    </div>
  );
};

export default LoginCard;
