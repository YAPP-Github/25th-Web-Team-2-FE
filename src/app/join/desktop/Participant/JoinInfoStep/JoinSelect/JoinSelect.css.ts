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
  border: `0.1rem solid ${colors.line01}`,
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
    "&[data-state='open']": {
      borderRadius: '1.2rem 1.2rem 0 0',
    },
  },

  '@media': {
    'screen and (max-width: 768px)': {
      ...fonts.body.small.M15,
      selectors: {
        '&[data-placeholder]': {
          ...fonts.body.small.M15,
        },
      },
    },
  },
});

export const selectContent = style({
  minWidth: 'var(--radix-select-trigger-width)',
  maxHeight: '34rem',
  padding: '1rem 0.8rem',
  border: `0.1rem solid ${colors.line01}`,
  borderRadius: '1.2rem',

  backgroundColor: colors.field01,
  boxShadow: '0px 4px 8px rgba(53, 59, 61, 0.2)',
  overflowY: 'scroll',

  selectors: {
    '&[data-state="open"]': {
      borderRadius: '0 0 1.2rem 1.2rem',
    },
  },

  '@media': {
    'screen and (max-width: 768px)': {
      maxHeight: '28.6rem',
    },
  },

  '::-webkit-scrollbar': {
    width: '2.2rem',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: colors.icon02,
    borderRadius: '3rem',

    border: '0.8rem solid transparent',
    backgroundClip: 'padding-box',
  },
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
