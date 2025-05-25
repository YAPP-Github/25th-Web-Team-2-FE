import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';
import { style } from '@vanilla-extract/css';

export const mobileLoginCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  padding: '2.4rem',

  borderRadius: '1rem',
  backgroundColor: colors.field04,
});

export const titleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const titleText = style({
  ...fonts.title.medium.B20,
  color: colors.text06,
});

export const subTitleText = style({
  ...fonts.body.small.M15,
  color: colors.text06,
});

export const buttonContainer = style({
  display: 'flex',
  backgroundColor: colors.field01,
  border: `1px solid ${colors.line01}`,
  borderRadius: '0.8rem',
});

export const loginButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '1rem 2.8rem',
});

export const loginButtonText = style({
  ...fonts.label.large.M14,
  color: colors.text06,
  whiteSpace: 'nowrap',
});

export const verticalLine = style({
  position: 'relative',
  selectors: {
    '&::after': {
      content: '""',
      width: '0.1rem',
      height: '100%',
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)',
      backgroundColor: colors.line01,
    },
  },
});
