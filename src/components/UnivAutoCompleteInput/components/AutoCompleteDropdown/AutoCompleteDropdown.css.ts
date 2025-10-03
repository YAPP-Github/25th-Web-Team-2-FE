import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const emptyAutoComplete = style({
  position: 'absolute',
  top: 'calc(100% + 0.8rem)',
  left: 0,
  width: '100%',
  minHeight: '25.2rem',
  backgroundColor: colors.field01,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '1.2rem',
  border: `0.1rem solid ${colors.line02}`,
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  zIndex: 1,
});

export const emptyAutoCompleteText = style({
  ...fonts.body.normal.M16,
  color: colors.text03,
});

export const emptyAutoCompleteItem = style({
  ...fonts.body.small.M15,
  color: colors.text06,
  width: '100%',
  textAlign: 'left',
  padding: '0.6rem 1.2rem',
});

export const autoCompleteDropdown = style({
  position: 'absolute',
  top: 'calc(100% + 0.8rem)',
  left: 0,

  width: '100%',
  maxHeight: '25.2rem',
  padding: '0.8rem',

  display: 'flex',
  flexDirection: 'column',
  borderRadius: '1.2rem',
  border: `0.1rem solid ${colors.line02}`,
  backgroundColor: colors.field01,
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  zIndex: 1,
});

export const autoCompleteList = style({
  overflowY: 'auto',

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

export const autoCompleteItem = style({
  ...fonts.body.small.M15,
  color: colors.text06,
  width: '100%',
  textAlign: 'left',
  padding: '0.6rem 1.2rem',
  cursor: 'pointer',
  borderRadius: '0.8rem',
  selectors: {
    '&:hover': {
      backgroundColor: colors.field02,
    },
  },
});

export const autoCompleteCustomItem = style({
  ...fonts.body.normal.M16,
  color: colors.text06,
  cursor: 'pointer',

  height: '4.8rem',
  padding: '1.2rem 0.8rem 0',
  borderTop: `0.1rem solid ${colors.line01}`,

  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const autoCompleteHighlight = style({
  color: colors.primaryMint,
});
