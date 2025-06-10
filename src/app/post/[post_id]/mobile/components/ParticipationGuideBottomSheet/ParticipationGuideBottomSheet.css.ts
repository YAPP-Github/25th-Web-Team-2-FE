import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const participationGuideBottomSheetLayout = style({
  minWidth: '3.7rem',
  margin: '0 1.5rem',
  backgroundColor: colors.primaryTinted,

  zIndex: 999,
});

export const bottomSheetTitle = style({
  ...fonts.title.small.SB18,
  color: colors.text06,

  marginBottom: '1.6rem',
});
