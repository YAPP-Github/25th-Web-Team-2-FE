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
  padding: '1.4rem 0.4rem',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const divider = style({
  position: 'relative',
  height: '1.6rem',
  display: 'flex',
  alignItems: 'center',

  selectors: {
    '&::after': {
      position: 'absolute',
      content: '""',
      width: 'calc(100vw - 3.2rem)', // 뷰포트 너비 - 좌우 패딩
      height: '0.1rem',
      left: '-1.6rem', // 좌우 패딩 만큼 왼쪽으로 이동
      backgroundColor: colors.line02,
    },
  },
});

export const deleteButton = style({
  color: colors.textAlert,
});
