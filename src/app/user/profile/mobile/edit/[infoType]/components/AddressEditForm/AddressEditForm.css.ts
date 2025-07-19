import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { style } from '@vanilla-extract/css';

export const joinAreaFilterContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const filterTitleWrapper = style({
  ...fonts.label.large.M14,
  color: colors.text06,
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
});

export const filterTitle = style({
  ...fonts.label.large.M14,
});

export const requiredStar = style({
  color: colors.textAlert,
});

export const joinAreaFilterWrapper = style({
  display: 'flex',
  gap: '0.8rem',
});
