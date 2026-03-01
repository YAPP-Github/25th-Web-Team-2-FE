import { GENDER_TYPE } from '../constants/gender';
import { GenderType } from '../types/gender';

export const getGenderLabel = (gender: GenderType): string => {
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
