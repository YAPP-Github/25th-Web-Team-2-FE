import { SITE_URL } from './url';

export const SITE_NAME = '그라밋';
export const SITE_ALTERNATE_NAME = 'Gradmeet';
export const SITE_DESCRIPTION =
  '대학원생 연구자가 대학생 참여자를 모집하여 실험을 진행할 수 있도록 돕는 실험 참여자 모집 플랫폼';

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * 다른 페이지의 JSON-LD 에서 발행자로 참조할 때 사용합니다.
 * 크롤러는 페이지 단위로 읽으므로 @id 만이 아니라 name·url 을 함께 둡니다.
 */
export const ORGANIZATION_REF = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
} as const;
