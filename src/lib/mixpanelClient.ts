/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
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
    console.log('✅ Mixpanel initialized');
  }
};

/**
 * Mixpanel 이벤트 로깅 함수
 * @param event 이벤트 이름
 * @param properties 이벤트 속성 (선택)
 */

//todo 수정 예정
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel Token is missing.');
    return;
  }

  if (!isMixpanelInitialized) {
    console.warn('Mixpanel is not initialized. Initializing now...');
    initMixpanel();
  }
  mixpanel.track(event, properties);
};
/**
 * 사용자 ID 설정 (로그인 시 호출)
 * @param userId 사용자 ID
 */
export const identifyUser = (userId: string) => {
  if (!MIXPANEL_TOKEN) return;
  mixpanel.identify(userId);
};

/**
 * 사용자 속성 설정 (유저 프로필 업데이트)
 * @param properties 사용자 속성 데이터
 */
export const setUserProperties = (properties: Record<string, string>) => {
  if (!MIXPANEL_TOKEN) return;
  mixpanel.people.set(properties);
};
