import { durationMinutesOptions } from '@/app/upload/upload.constants';

export const getDurationLabel = (value: string): string => {
  const foundOption = durationMinutesOptions.find((option) => option.value === value);
  return foundOption ? foundOption.label : '본문 참고';
};
