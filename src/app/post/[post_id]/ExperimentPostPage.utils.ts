import { format } from 'date-fns';

import { GenderType } from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';
import { durationMinutesOptions } from '@/app/upload/upload.constants';
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
    case GenderType.MALE:
      return '남성';
    case GenderType.FEMALE:
      return '여성';
    case GenderType.ALL:
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
// todo 임시 데이터가 존재할 동안만 유효성 확인 -> 임시 데이터 제거 후 유효성 검사 제거
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

export {
  formattedContentText,
  getGenderLabel,
  getDurationLabel,
  getRegionLabel,
  getAreaLabel,
  isValidImageUrl,
  getMatchTypeText,
  formatDate,
};
