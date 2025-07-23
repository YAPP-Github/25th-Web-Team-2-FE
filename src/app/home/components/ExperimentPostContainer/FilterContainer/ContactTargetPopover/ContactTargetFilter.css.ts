import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const popoverTrigger = style({
  ...fonts.label.large.SB14,
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
  width: 'fit-content',
  padding: '0.6rem 1rem 0.6rem 1.4rem',
  border: 'none',
  borderRadius: '1.2rem',
  color: 'var(--trigger-color)',
  backgroundColor: 'var(--trigger-bg)',
  whiteSpace: 'nowrap',
  selectors: {
    '&:hover': {
      boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
    },
  },

  '@media': {
    'screen and (max-width: 767px)': {
      color: 'var(--trigger-color-mobile)',
      backgroundColor: 'var(--trigger-bg-mobile)',
      padding: '0.8rem 1rem 0.8rem 1.4rem',
    },
  },
});

export const popoverContent = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  borderRadius: '1.2rem',
  backgroundColor: colors.field01,
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  gap: '1.6rem',
  marginTop: '0.6rem',
});
