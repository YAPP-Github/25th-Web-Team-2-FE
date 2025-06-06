import { AREA_ALL, REGION_MAPPER, AREA_MAPPER } from './home.constants';
import { GenderFilterValue } from './home.types';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { colors } from '@/styles/colors';
import { RegionType } from '@/types/filter';
import { isParticipantInfo } from '@/utils/typeGuard';

export const formatPostDate = ({
  startDate,
  endDate,
}: {
  startDate: string | null;
  endDate: string | null;
}) => {
  const format = (date: string) =>
    new Date(date).toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    });

  // 둘 다 있는 경우
  if (startDate && endDate) {
    return `${format(startDate)} ~ ${format(endDate)}`;
  }

  // 둘 다 없는 경우
  else if (!startDate && !endDate) {
    return '공고 참고';
  }

  // 시작일자만 있는 경우
  else if (startDate && !endDate) {
    return format(startDate);
  }

  // 마감일자만 있는 경우
  else if (!startDate && endDate) {
    return format(endDate);
  }
};

export const filterParticipantInfo = (data?: ParticipantResponse | ResearcherResponse) => {
  if (data && isParticipantInfo(data)) {
    return data;
  }

  return null;
};

/**
 * 만 나이 계산 함수
 * @param birthDate - 'YYYY-MM-DD' 형식의 생년월일 문자열
 * @returns 만 나이
 */
export const calculateAgeFromBirthDate = (birthDate: string) => {
  if (!birthDate) return;

  const today = new Date();
  const birth = new Date(birthDate);

  const yearDiff = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  // 생일이 지난 경우
  const hasBirthdayPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);

  return hasBirthdayPassed ? yearDiff : yearDiff - 1;
};

export const getContactTargetFilterText = (age?: number, gender?: GenderFilterValue) => {
  const genderLabelMapper = { MALE: '남성', FEMALE: '여성', ALL: '' };

  if (age && gender) {
    return gender === 'ALL' ? `만 ${age}세` : `${genderLabelMapper[gender]} · 만 ${age}세`;
  } else if (!age && gender) {
    return `${genderLabelMapper[gender]}`;
  } else if (age && !gender) {
    return `만 ${age}세`;
  }

  return '모집 대상';
};

export const getRegionFilterText = (region?: RegionType | null, areas?: string[]) => {
  const isArea = areas && areas.length > 0;

  if (region) {
    if (!isArea) {
      return `${REGION_MAPPER[region]}`;
    }

    if (areas.length >= 2) {
      return `${REGION_MAPPER[region]} · ${AREA_MAPPER[areas[0]]} 외 ${areas.length - 1}`;
    }
    return `${REGION_MAPPER[region]} · ${AREA_MAPPER[areas[0]]}`;
  }

  return '지역';
};

// 서울 전체, 경기 전체 등 선택 시 나머지 선택 불가 처리
export const isCheckedAreaAll = (selectedAreas: Record<string, boolean>) => {
  return !AREA_ALL.some((area) => selectedAreas[area]);
};

export const getFilterColors = (isSelected: boolean) => {
  if (isSelected) {
    return {
      '--trigger-color': colors.text01,
      '--trigger-bg': colors.field09,
      '--trigger-color-mobile': colors.text01,
      '--trigger-bg-mobile': colors.field09,
    };
  }

  return {
    '--trigger-color': colors.text06,
    '--trigger-bg': colors.field01,
    '--trigger-color-mobile': colors.text06,
    '--trigger-bg-mobile': colors.field03,
  };
};
