import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const regionPopoverContainer = style({
  width: '45.2rem',
  borderRadius: '1.2rem',
  outline: 'none',
  border: `0.1rem solid ${colors.line01}`,
  selectors: {
    '&[data-state="open"]': {
      border: `0.1rem solid ${colors.primaryMint}`,
      outline: 'none',
    },
  },
});

export const uploadInputField = recipe({
  base: {
    ...fonts.label.large.R14,
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '45.2rem',
    height: '4.8rem',
    padding: '10px',
    borderRadius: '1.2rem',
    outline: 'none',
    '::placeholder': {
      color: colors.text02,
    },
    ':focus': {
      outline: `0.1rem solid ${colors.lineTinted}`,
      outlineOffset: '0',
      border: 'none',
    },
  },
  variants: {
    isError: {
      true: {
        border: `0.1rem solid ${colors.textAlert}`,
      },
    },
    error: {
      true: {
        border: `0.1rem solid ${colors.textAlert}`,
      },
    },
  },
  defaultVariants: {
    isError: false,
    error: false,
  },
});

export const placeholderText = recipe({
  base: {
    ...fonts.label.large.R14,
  },
  variants: {
    hasValue: {
      true: {
        color: colors.text06,
      },
      false: {
        color: colors.text02,
      },
    },
  },
});

export const popoverContent = style({
  width: '45.2rem',
  height: '30.6rem',
  padding: '2.2rem 1.6rem',
  background: colors.field01,
  border: `0.1rem solid ${colors.line01}`,
  borderRadius: '1.2rem',
  boxShadow: '0rem 0.4rem 1rem rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
});

export const popoverLayout = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '2.4rem',
  height: '100%',
  position: 'relative',
});

export const regionList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  overflowY: 'scroll',
  width: '11.2rem',
});

globalStyle(`${regionList}::after`, {
  content: "''",
  position: 'absolute',
  top: '50%',
  left: '12.4rem',
  transform: 'translateY(-50%)',
  width: '0.1rem',
  height: '26rem',
  backgroundColor: colors.line02,
});

export const subRegionList = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  overflowY: 'auto',
});

const commonRegionButton = style({
  ...fonts.label.large.M14,
  height: '3.4rem',
  borderRadius: '1.2rem',
  textAlign: 'left',
  ':hover': {
    backgroundColor: colors.field02,
  },
});

export const regionButton = style([
  commonRegionButton,
  {
    padding: '0.6rem 1.2rem',
  },
]);

export const subRegionButton = style([
  commonRegionButton,
  {
    padding: '0.6rem 0.8rem',
  },
]);

export const activeRegionButton = style({
  backgroundColor: colors.primaryTinted,
  border: `0.1rem solid ${colors.lineTinted}`,
  color: colors.textPrimary,
});
