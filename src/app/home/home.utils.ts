import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { isParticipantInfo } from '@/utils/typeGuard';
import { GenderValue } from './home.types';

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

export const calculateAgeFromBirthDate = (birthDate?: string) => {
  if (!birthDate) return;

  const today = new Date();
  const date = new Date(birthDate);
  const age = today.getFullYear() - date.getFullYear();
  return age;
};

export const getContactTargetFilterText = (age?: number, gender?: GenderValue) => {
  const genderLabelMapper = { MALE: '남성', FEMALE: '여성' };

  if (age && gender) {
    return `${genderLabelMapper[gender]} · 만 ${age}세`;
  } else if (!age && gender) {
    return `${genderLabelMapper[gender]}`;
  } else if (age && !gender) {
    return `만 ${age}세 `;
  }

  return '모집 대상';
};
