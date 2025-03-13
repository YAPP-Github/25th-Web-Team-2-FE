/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const isClient = typeof window !== 'undefined';
let isMixpanelInitialized = false;

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }

  if (!isMixpanelInitialized) {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: process.env.NODE_ENV === 'development',
      track_pageview: false,
      persistence: 'localStorage',
    });
    isMixpanelInitialized = true;
  }
};

/**
 * Mixpanel 이벤트 로깅 함수
 * @param event 이벤트 이름
 * @param properties 이벤트 속성 (선택)
 */

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (!isClient) return;

  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel Token is missing.');
    return;
  }

  if (!isMixpanelInitialized) {
    initMixpanel();
  }
  mixpanel.track(event, properties);
};
/**
 * 사용자 ID 설정 (로그인 시 호출)
 * @param userId 사용자 ID
 */
export const identifyUser = (userId: string) => {
  if (!MIXPANEL_TOKEN || !isClient) return;

  try {
    mixpanel.identify(userId);
    mixpanel.people.set_once({
      signup_date: new Date().toISOString(), // 최초 가입 시점 기록
    });
  } catch (error) {
    console.error('Mixpanel identify error:', error);
  }
};

/**
 * 사용자 속성 설정 (유저 프로필 업데이트)
 * @param properties 사용자 속성 데이터
 */
export const setUserProperties = (properties: Record<string, string>) => {
  if (!isClient) return;
  if (!MIXPANEL_TOKEN) return;

  try {
    mixpanel.people.set(properties);
  } catch (error) {
    console.error('Mixpanel set properties error:', error);
  }
};

/**
 * 사용자 로그아웃 (로그아웃 시 호출)
 */
export const logoutUser = () => {
  if (!MIXPANEL_TOKEN || !isClient) return;

  try {
    mixpanel.reset();
  } catch (error) {
    console.error('Mixpanel reset error:', error);
  }
};
