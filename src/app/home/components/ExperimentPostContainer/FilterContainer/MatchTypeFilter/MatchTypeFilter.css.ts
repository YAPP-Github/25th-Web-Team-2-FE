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
  padding: '0.5rem 1.4rem',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
    },
  },
});

export const contentContainer = style({
  width: '10rem',
  padding: '0.8rem',
  backgroundColor: colors.field01,
  borderRadius: '0.8rem',
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  overflow: 'hidden',
});

export const selectItem = style({
  ...fonts.label.large.M14,
  color: colors.text06,
  display: 'flex',
  paddingLeft: '1.2rem',
  alignItems: 'center',
  height: '3.4rem',
  borderRadius: '1.2rem',
  cursor: 'pointer',
  selectors: {
    '&[data-highlighted]': {
      backgroundColor: colors.field02,
      outline: 'none',
    },
    "&[data-state='checked']": {
      backgroundColor: colors.primaryTinted,
      color: colors.textPrimary,
      border: `0.1rem solid ${colors.textPrimary}`,
    },
  },
});
