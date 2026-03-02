import { colors } from '@styles/colors';

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
