import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';

export const applyMethodBottomSheetLayout = style({
  minWidth: '3.7rem',
  margin: '0 1.5rem',
  backgroundColor: colors.primaryTinted,

  zIndex: 999,
});
