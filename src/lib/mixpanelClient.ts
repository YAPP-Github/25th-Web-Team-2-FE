/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const isClient = typeof window !== 'undefined';
const isTestEnv = process.env.NODE_ENV === 'test';
const isProductionDomain = process.env.VERCEL_ENV === 'production';
let isMixpanelInitialized = false;

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }

  if (!isMixpanelInitialized) {
    mixpanel.init(MIXPANEL_TOKEN, {
      track_pageview: false,
      persistence: 'localStorage',
      record_heatmap_data: true,
      record_max_ms: 10 * 60 * 1000, // 10분 이상 기록 시 자동 종료
      record_idle_timeout_ms: 5 * 60 * 1000, // 5분 이상 화면 이탈 시 기록 종료
    });
    isMixpanelInitialized = true;
  }
};

export const startRecording = () => {
  if (!isClient || !isProductionDomain) {
    return;
  }

  mixpanel.start_session_recording();
};

export const stopRecording = () => {
  if (!isClient || !isProductionDomain) {
    return;
  }

  mixpanel.stop_session_recording();
};

/**
 * Mixpanel 이벤트 로깅 함수
 * @param event 이벤트 이름
 * @param properties 이벤트 속성 (선택)
 */

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (!isClient || isTestEnv) return;

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
