import { Gender } from '@/types/user';

export const getContactTargetFilterText = (age?: number, gender?: Gender) => {
  const genderLabelMapper = { MALE: '남성', FEMALE: '여성', ALL: '전체' };

  if (age && gender) {
    return gender === 'ALL' ? `만 ${age}세` : `${genderLabelMapper[gender]} · 만 ${age}세`;
  }
  if (!age && gender) {
    return `${genderLabelMapper[gender]}`;
  }
  if (age && !gender) {
    return `만 ${age}세`;
  }

  return '모집 대상';
};
