import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const joinLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4rem',
  paddingTop: '8.4rem',
  flexGrow: 1,
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
  gap: '2.8rem',
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
