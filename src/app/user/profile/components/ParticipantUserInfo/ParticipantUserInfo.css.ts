import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const joinLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.2rem',
  paddingTop: '6rem',
  flexGrow: 1,
});

export const updateInfoFormContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const updateInfoForm = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2.8rem',
  backgroundColor: colors.field03,
  borderRadius: '1.2rem',
  padding: '2.4rem 4rem',
});

export const updateButton = style({
  ...fonts.body.normal.SB16,
  backgroundColor: colors.primaryMint,
  color: colors.text01,
  borderRadius: '1.2rem',
  padding: '1.2rem 0',
  width: '20rem',
  alignItems: 'center',
  margin: '0 auto',
  selectors: {
    '&:disabled': {
      color: colors.text02,
      backgroundColor: colors.field04,
    },
  },
});

export const leaveButton = style({
  alignSelf: 'flex-end',
  ...fonts.label.large.R14,
  color: colors.text03,
  display: 'flex',
  alignItems: 'center',
  gap: '0.2em',
});

export const termContainer = style({
  ...fonts.body.normal.M16,
  color: colors.text06,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  width: '100%',
});
