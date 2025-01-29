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

export { formattedContentText, getGenderLabel, getDurationLabel, getRegionLabel, getAreaLabel };
