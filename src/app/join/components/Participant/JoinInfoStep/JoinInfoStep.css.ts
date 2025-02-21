import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const joinButton = style({
  ...fonts.body.normal.SB16,
  backgroundColor: colors.primaryMint,
  color: colors.text01,
  borderRadius: '1.2rem',
  padding: '1.2rem 0',
  width: '20rem',
  alignItems: 'center',
  marginBottom: '5.6rem',
  selectors: {
    '&:disabled': {
      color: colors.text02,
      backgroundColor: colors.field04,
    },
  },
});

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
