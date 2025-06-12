import { globalStyle, style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postMenuBottomSheetLayout = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'flex-start',
});

globalStyle(`${postMenuBottomSheetLayout} > button:last-child`, {
  color: colors.textAlert,
});

export const postMenuButton = style({
  ...fonts.body.small.M15,
  width: ' 100%',
  height: '5.2rem',
  padding: '1.4rem 0.4rem',

  textAlign: 'left',
});
