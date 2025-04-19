import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const radioButtonGroupContainerLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  width: '100%',
});

export const labelWrapper = style({
  ...fonts.label.large.M14,
  display: 'flex',
  gap: '0.4rem',
  color: colors.text06,
});

export const requiredStar = style({
  color: colors.textAlert,
});

export const tipWrapper = style({
  ...fonts.label.medium.R13,
  display: 'flex',
  gap: '0.4rem',
  color: colors.text02,
});
