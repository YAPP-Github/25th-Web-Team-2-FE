import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const listBottomSheetLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const listItem = style({
  ...fonts.body.small.M15,
  color: colors.text06,
  width: '100%',
  display: 'flex',
  padding: '1.4rem 0',
  alignItems: 'center',
});
