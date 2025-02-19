import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const triggerWrapper = style({
  ...fonts.label.large.SB14,
  color: 'var(--trigger-color)',
  backgroundColor: 'var(--trigger-bg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.4rem',
  borderRadius: '1.2rem',
  cursor: 'pointer',
});

export const contentContainer = style({
  padding: '0.8rem',
  backgroundColor: colors.field01,
  borderRadius: '0.8rem',
});

export const selectItem = style({
  ...fonts.label.large.M14,
  color: colors.text06,
  display: 'flex',
  padding: '0.6rem 2rem 0.6rem 1.2rem',
  whiteSpace: 'nowrap',
  alignItems: 'center',

  borderRadius: '1.2rem',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: colors.field02,
      outline: 'none',
    },
  },
});
