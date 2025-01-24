import { GenderType } from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';

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

export { formattedContentText, getGenderLabel };
