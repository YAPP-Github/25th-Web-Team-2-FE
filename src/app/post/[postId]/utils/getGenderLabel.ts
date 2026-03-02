import { Gender } from '@/types/user';
import { GENDER } from '@constants/user';

export const getGenderLabel = (gender: Gender): string => {
  switch (gender) {
    case GENDER.MALE:
      return '남성';
    case GENDER.FEMALE:
      return '여성';
    case GENDER.ALL:
      return '무관';
    default:
      return '무관';
  }
};
