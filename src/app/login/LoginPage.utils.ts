import { ERROR_MESSAGES } from '@/apis/config/constants';
import { CustomError } from '@/apis/config/error';
import { LOGIN_PROVIDER, ROLE } from '@/constants/config';
import { CLICK_LOGIN_PARTICIPANT, CLICK_LOGIN_RESEARCHER } from '@/lib/mixpanel/signupEvents';
import { trackEvent } from '@/lib/mixpanelClient';
import { Role } from '@/types/user';

const existAccountRoleMapper: Record<string, string> = {
  RESEARCHER: '참여자',
  PARTICIPANT: '연구자',
};

export const getAuthErrorMessage = (role: string, error: CustomError) => {
  const alreadyJoinedMessage = `${existAccountRoleMapper[role]}로 ${ERROR_MESSAGES[error.code]}`;
  const message = error.code === 'ME0002' ? alreadyJoinedMessage : error.message;
  const errorMessage = message || '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';

  return errorMessage;
};

export const getOAuthLoginConfig = (role: Role) => {
  const googleOauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&state=${role}|${LOGIN_PROVIDER.google}`;
  const naverOauthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_STATE}|${role}|${LOGIN_PROVIDER.naver}`;
  const eventName = role === ROLE.researcher ? CLICK_LOGIN_RESEARCHER : CLICK_LOGIN_PARTICIPANT;

  const handleGoogleLogin = () => {
    trackEvent(eventName, { provider: LOGIN_PROVIDER.google });
  };

  const handleNaverLogin = () => {
    trackEvent(eventName, { provider: LOGIN_PROVIDER.naver });
  };

  return {
    googleOauthUrl,
    naverOauthUrl,
    handleGoogleLogin,
    handleNaverLogin,
  };
};
