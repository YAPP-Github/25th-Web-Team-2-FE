import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { zIndex } from '@/styles/zIndex';
import { colors } from '@styles/colors';
import { fonts } from '@styles/fonts.css';

export const applyMethodSectionLayout = style({
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
  padding: '2.8rem',
  flex: 1,
});

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
  flexDirection: 'column',
  gap: '3.2rem',

  '@media': {
    'screen and (max-width: 767px)': {
      flexDirection: 'column',
      gap: '1.2rem',
    },
  },
});

export const ageInputContainer = recipe({
  base: {
    width: '100%',
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
  },
  defaultVariants: {
    isError: false,
  },
});

export const textStyle = style({
  ...fonts.label.large.M14,
  color: colors.text06,
});

export const applyMethodTitleContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
});

export const uploadFormSectionTitle = style({
  ...fonts.title.small.SB18,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  gap: '0.8rem',
});

export const fakeScheduleButton = style({
  ...fonts.label.medium.SB13,
  color: colors.primaryMint,
  backgroundColor: colors.primaryTinted,
  borderRadius: '0.8rem',
  padding: '0.3rem 0.8rem',
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

export const alertModalDescription = style({
  ...fonts.body.normal.SB16,
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});

export const alertModalContent = style({
  width: '37rem',
  backgroundColor: colors.field01,
  borderRadius: '1.2rem',
  padding: '3.2rem 1.6rem 1.6rem 1.6rem',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.2)',
  zIndex: zIndex.dialogContent,
  textAlign: 'center',
});
