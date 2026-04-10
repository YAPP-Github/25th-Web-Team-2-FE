import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const alarmAgreeSection = style({
  padding: '1.2rem',
  backgroundColor: colors.field03,
  borderRadius: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  transition: 'background-color 0.2s ease-in-out',

  marginTop: '2.3rem',
});

export const alarmAgreeHeader = style({
  ...fonts.label.large.M14,
});

export const alarmPreviewWrapper = recipe({
  base: {
    borderRadius: '1.2rem',
    background: colors.field01,
    padding: '26px 52.7px 0 52.7px',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
  },
  variants: {
    checked: {
      true: {
        opacity: 1,
        transform: 'translateY(0)',
      },
      false: {
        opacity: 0.72,
        transform: 'translateY(0)',
      },
    },
  },
});

export const alarmPreviewCard = style({
  margin: '0 auto',
  borderRadius: '1.2rem 1.2rem 0 0',
  background: '#ECEFF1',
  padding: '20px 20px 0px 20px',
});

export const alarmPreviewHeadline = style({
  ...fonts.title.medium.SB20,
  marginBottom: 20,
});

export const alarmPreviewMetaRow = style({
  ...fonts.label.medium.R13,
  color: colors.text04,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginBottom: 8,
});

export const alarmPreviewContentBox = style({
  borderRadius: '0.8rem 0.8rem 0 0',
  background: colors.field01,
  padding: '2.8rem 3.2rem',
});

export const alarmPreviewSubInfo = style({
  ...fonts.label.large.M14,
  color: colors.text04,
  marginBottom: 4,
});

export const divider = style({
  color: colors.line03,
  margin: '0 0.4rem',
});

export const rewardText = style({
  ...fonts.label.large.SB14,
  color: colors.primaryMint,
});

export const alarmPreviewTitle = style({
  ...fonts.body.normal.M16,
});
