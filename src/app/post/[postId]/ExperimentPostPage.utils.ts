import { format } from 'date-fns';

import { GENDER_TYPE, GenderType } from './ExperimentPostPage.types';

import { durationMinutesOptions } from '@/app/upload/upload.constants';
import { convertToWebpUrl } from '@/app/upload/upload.utils';
import { UPLOAD_REGION } from '@/constants/uploadRegion';

/**
 * 문자열에서 '\\n'을 줄바꿈 문자('\n')로 변환
 *
 * @param {string} text - 변환할 문자열
 * @returns {string} 변환된 문자열
 */
const formattedContentText = (text: string) => {
  return text.replace(/\\n/g, '\n');
};

const getGenderLabel = (gender: GenderType): string => {
  switch (gender) {
    case GENDER_TYPE.MALE:
      return '남성';
    case GENDER_TYPE.FEMALE:
      return '여성';
    case GENDER_TYPE.ALL:
      return '무관';
    default:
      return '무관';
  }
};

const getDurationLabel = (value: string): string => {
  const foundOption = durationMinutesOptions.find((option) => option.value === value);
  return foundOption ? foundOption.label : '본문 참고';
};

const getRegionLabel = (region: string): string => {
  const foundRegion = UPLOAD_REGION.find((regionObj) => regionObj.value === region);
  return foundRegion ? foundRegion.label : '';
};

const getAreaLabel = (region: string, area: string): string => {
  const foundRegion = UPLOAD_REGION.find((regionObj) => regionObj.value === region);
  if (foundRegion) {
    const foundArea = foundRegion.children?.find((areaObj) => areaObj.value === area);
    return foundArea ? foundArea.label : '';
  }
  return '';
};

// 유효한 이미지 URL인지 확인
const isValidImageUrl = (url: string) => {
  return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
};

const getMatchTypeText = (matchType: 'OFFLINE' | 'ONLINE' | 'ALL'): string => {
  const matchTypeMap: Record<'OFFLINE' | 'ONLINE' | 'ALL', string> = {
    OFFLINE: '대면',
    ONLINE: '비대면',
    ALL: '대면+비대면',
  };

  return matchTypeMap[matchType];
};

// yyyy-mm-dd 형식의 문자열을 yyyy.MM.dd 형식으로 변환하는 함수
const formatDate = (hyphenDate: string): string => {
  if (!hyphenDate) return '';

  return format(new Date(hyphenDate), 'yyyy. MM. dd') ?? '';
};

// 이미지 URL이 유효한지 확인하는 함수
// 서버에 HEAD 요청을 보내 이미지가 존재하는지 확인하며 일정 횟수까지 재시도 함
const checkImageExists = async (url: string, retries = 10, delay = 600): Promise<boolean> => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
      if (res.ok) return true;
    } catch (_) {}
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return false;
};

// WebP 이미지가 존재하면 이미지 URL 배열에 교체하는 함수
const replaceImageListWithWebp = async (originalImages: string[]): Promise<string[]> => {
  return await Promise.all(
    originalImages.map(async (originalUrl) => {
      if (!isValidImageUrl(originalUrl)) return originalUrl;

      const webpUrl = convertToWebpUrl(originalUrl);
      const isWebpAvailable = await checkImageExists(webpUrl);

      return isWebpAvailable ? webpUrl : originalUrl;
    }),
  );
};

export {
  formattedContentText,
  getGenderLabel,
  getDurationLabel,
  getRegionLabel,
  getAreaLabel,
  isValidImageUrl,
  getMatchTypeText,
  formatDate,
  checkImageExists,
  replaceImageListWithWebp,
};
