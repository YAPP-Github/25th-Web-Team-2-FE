import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const desktopJoinPageLayout = style({
  display: 'flex',
  backgroundColor: colors.field01,
  maxWidth: '56rem',
  width: '100%',
  margin: '0 auto',
  paddingTop: '8rem',
  paddingBottom: '20.2rem', // 12. 2 (footer) + 8 (footer와 버튼 사이 여백)

  '@media': {
    'screen and (max-width: 767px)': {
      paddingBottom: '8rem',
    },
  },
});

export const mobileJoinPageLayout = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: colors.field01,
  width: '100%',
  maxWidth: '768px',
  height: '100dvh',
  margin: '0 auto',
});

export const joinLayout = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4rem',
});

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  width: '100%',
});

export const titleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const joinContentContainer = style({
  backgroundColor: colors.field02,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  borderRadius: '1.2rem',
  padding: '3.2rem 4rem',
});

export const joinTitle = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
});

export const progressBarContainer = style({
  width: '8rem',
  height: '0.6rem',
  backgroundColor: colors.field03,
  borderRadius: '0.6rem',
});

export const progressBarFill = style({
  width: 'var(--progress-width)',
  height: '100%',
  backgroundColor: colors.primaryMint,
  borderRadius: '0.6rem',
  transition: 'width 1s',
});

export const joinForm = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4rem',
});

export const nextButton = style({
  ...fonts.body.normal.SB16,
  backgroundColor: colors.primaryMint,
  color: colors.text01,
  borderRadius: '1.2rem',
  padding: '1.2rem 0',
  width: '20rem',
  alignItems: 'center',
  selectors: {
    '&:disabled': {
      color: colors.text02,
      backgroundColor: colors.field04,
    },
  },
});
