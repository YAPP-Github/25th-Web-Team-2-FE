'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  badge,
  buttonContainer,
  cardTitleContainer,
  loginButton,
  loginCardLayout,
  recentLoginTooltipContent,
} from './LoginCard.css';
import { descriptionWrapper } from '../../LoginPage.css';

import ArrowTooltip from '@/app/join/components/AreaTooltip/ArrowTooltip';
import Google from '@/assets/images/google.svg';
import Naver from '@/assets/images/naver.svg';
import { ROLE } from '@/constants/config';
import { localStorageManager, STORAGE_KEYS } from '@/lib/localStorageManager';
import { CLICK_LOGIN_PARTICIPANT, CLICK_LOGIN_RESEARCHER } from '@/lib/mixpanel/signupEvents';
import { trackEvent } from '@/lib/mixpanelClient';
import { colors } from '@/styles/colors';
import { LoginProvider, Role } from '@/types/user';

const roleMapper = {
  RESEARCHER: '연구자',
  PARTICIPANT: '참여자',
};

const PROVIDER = {
  google: 'GOOGLE',
  naver: 'NAVER',
} as const;

interface LoginCardProps {
  role: Role;
  description: string[];
}

const LoginCard = ({ role, description }: LoginCardProps) => {
  const router = useRouter();
  const [lastProvider, setLastProvider] = useState<LoginProvider | null>(null);

  const isRecentGoogle = lastProvider === PROVIDER.google;
  const isRecentNaver = lastProvider === PROVIDER.naver;

  const goToLoginGoogle = () => {
    const eventName = role === ROLE.researcher ? CLICK_LOGIN_RESEARCHER : CLICK_LOGIN_PARTICIPANT;
    trackEvent(eventName, { provider: PROVIDER.google });
    localStorageManager.set(STORAGE_KEYS.lastLogin, { role, provider: PROVIDER.google });
    const googleOauthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&state=${role}|${PROVIDER.google}`;
    router.push(googleOauthURL);
  };

  const goToLoginNaver = () => {
    const eventName = role === ROLE.researcher ? CLICK_LOGIN_RESEARCHER : CLICK_LOGIN_PARTICIPANT;
    trackEvent(eventName, { provider: PROVIDER.naver });

    const naverOauthURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_STATE}|${role}|${PROVIDER.naver}`;
    router.push(naverOauthURL);
  };

  useEffect(() => {
    const data = localStorageManager.get(STORAGE_KEYS.lastLogin);
    if (data && data.role === role) setLastProvider(data.provider);
  }, [role]);

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
        <Tooltip.Provider delayDuration={0}>
          <Tooltip.Root open={isRecentNaver}>
            <button className={loginButton} onClick={goToLoginNaver}>
              <Tooltip.Trigger asChild>
                <Image src={Naver} alt="네이버" width={24} height={24} />
              </Tooltip.Trigger>
              <span>네이버 계정으로 로그인</span>
            </button>
            <Tooltip.Portal>
              <Tooltip.Content
                className={recentLoginTooltipContent}
                side="top"
                sideOffset={8}
                align="start"
              >
                최근 로그인
                <Tooltip.Arrow asChild>
                  <ArrowTooltip
                    style={{
                      position: 'relative',
                      transform: 'rotate(180deg)',
                      top: '-1.5px',
                    }}
                  />
                </Tooltip.Arrow>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root open={isRecentGoogle}>
            <button className={loginButton} onClick={goToLoginGoogle}>
              <Tooltip.Trigger asChild>
                <Image src={Google} alt="구글" width={24} height={24} />
              </Tooltip.Trigger>
              <span>구글 계정으로 로그인</span>
            </button>
            <Tooltip.Portal>
              <Tooltip.Content
                className={recentLoginTooltipContent}
                side="bottom"
                sideOffset={8}
                align="start"
              >
                최근 로그인
                <Tooltip.Arrow asChild>
                  <ArrowTooltip
                    style={{
                      position: 'relative',
                      transform: 'rotate(180deg)',
                      top: '-1.5px',
                    }}
                  />
                </Tooltip.Arrow>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
};

export default LoginCard;
