import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const applyMethodContainer = style({
  marginBottom: '4.8rem',
});

export const applyMethodContentLayout = style({
  display: 'flex',
  flexFlow: 'column nowrap',
});

export const addContactInfoContainer = style({
  width: '100%',
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '0.8rem',
});

export const targetConditionLayout = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '2.8rem',
});

export const targetGroupContainer = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
});

export const ageInputContainer = recipe({
  base: {
    width: '45.2rem',
    height: '4.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `0.1rem solid ${colors.line01}`,
    borderRadius: '1.2rem',
    padding: '1.3rem 1.6rem',
    transition: 'border-color 0.2s ease-in-out',
  },
  variants: {
    isError: {
      true: {
        border: `0.1rem solid ${colors.textAlert}`,
      },
    },
    isFocused: {
      true: {
        border: `0.1rem solid ${colors.primaryMint}`,
      },
    },
  },
  defaultVariants: {
    isError: false,
    isFocused: false,
  },
});

export const textStyle = style({
  ...fonts.label.large.M14,
  color: colors.text06,
});

export const alarmAgreeContainer = style({
  width: 'fit-content',
  height: '3.4rem',
  padding: '0 1rem',
  backgroundColor: colors.field02,
  borderRadius: '0.8rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out',
});

export const uploadFormSectionTitle = style({
  ...fonts.title.small.SB18,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '0.8rem',
  marginBottom: '2rem',
});

export const ReferToDetailsContainer = style({
  ...fonts.label.small.M12,
  color: colors.text04,
  marginTop: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
  justifyContent: 'right',
});

export const disabledAlarmAgreeText = style({
  ...fonts.label.small.M12,
  color: colors.text02,
  marginTop: '0.4rem',
});
