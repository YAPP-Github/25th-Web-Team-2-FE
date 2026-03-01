import { GENDER_TYPE, GenderType } from '../ExperimentPostPage.types';

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
