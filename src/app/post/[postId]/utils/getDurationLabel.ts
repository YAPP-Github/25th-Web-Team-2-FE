import { durationMinutesOptions } from '@upload/constants/durationMinutesOptions';

export const getDurationLabel = (value: string): string => {
  const foundOption = durationMinutesOptions.find((option) => option.value === value);
  return foundOption ? foundOption.label : '본문 참고';
};
