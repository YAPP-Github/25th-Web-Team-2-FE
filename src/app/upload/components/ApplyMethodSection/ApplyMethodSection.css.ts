import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const applyMethodContainer = style({
  marginTop: '2rem',
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
  },
  variants: {
    isError: {
      true: {
        border: `0.1rem solid ${colors.textAlert}`,
      },
    },
  },
  defaultVariants: {
    isError: false,
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
});

export const uploadFormSectionTitle = style({
  ...fonts.title.small.SB18,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '0.8rem',
  marginBottom: '2rem',
});

export const headingIcon = style({
  ...fonts.label.small.SB12,
  width: '1.8rem',
  height: '1.8rem',
  borderRadius: '50%',
  textAlign: 'center',
  padding: '0.2rem',
  backgroundColor: colors.primaryMint,
  color: colors.text01,
});

export const label = style({
  ...fonts.label.large.M14,
  color: colors.text05,
  marginBottom: '0.8rem',
  display: 'block',
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
