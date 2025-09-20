import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const joinSuccessLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '3.2rem',
  height: 'calc(100dvh - 28.2rem)', // 20.2rem + 8rem

  '@media': {
    'screen and (max-width: 767px)': {
      height: '100%', // NOTE: 모바일 대응. desktop 좁을 때 레이아웃 깨지지만 모바일 우선 고려.
    },
  },
});

export const joinContentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3.2rem',
  textAlign: 'center',
});

export const joinTitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4rem',
});

export const title = style({
  ...fonts.title.large.SB28,
  color: colors.text06,
});

export const image = style({
  margin: '3.2rem 0',
});

export const homeLink = style({
  ...fonts.body.normal.SB16,
  backgroundColor: colors.primaryMint,
  color: colors.text01,
  borderRadius: '1.2rem',
  padding: '1.2rem 3.35rem',
});
