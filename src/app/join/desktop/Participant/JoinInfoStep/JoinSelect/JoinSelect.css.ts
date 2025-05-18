import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const triggerWrapper = style({
  ...fonts.body.normal.M16,
  color: colors.text06,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.4rem',
  borderRadius: '1.2rem',
  padding: '1.6rem',
  backgroundColor: colors.field01,
  cursor: 'pointer',
  width: '100%',
  selectors: {
    '&[data-placeholder]': {
      ...fonts.body.normal.M16,
      color: colors.text02,
    },
    "&[aria-invalid='true']": {
      outline: `0.1rem solid ${colors.textAlert}`,
    },
  },
});

export const selectContent = style({
  width: '23.6rem',
  maxHeight: '34rem',
  padding: '1rem 0.8rem',
  backgroundColor: colors.field01,
  border: `0.1rem solid ${colors.line01}`,
  borderRadius: '1.2rem',
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  overflowY: 'scroll',
});

export const selectList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const selectItem = style({
  ...fonts.body.normal.M16,
  color: colors.text06,
  display: 'flex',
  padding: '0.6rem 1.2rem',
  alignItems: 'center',
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
