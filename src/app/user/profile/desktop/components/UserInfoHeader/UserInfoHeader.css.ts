import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const headerContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const titleContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

export const badge = style({
  ...fonts.label.large.SB14,
  width: 'fit-content',
  padding: '0.4rem 0.8rem',
  borderRadius: '1.2rem',
  color: 'var(--badge-color)',
  backgroundColor: 'var(--badge-bg)',
});

export const title = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
});

export const infoContainer = style({
  ...fonts.body.normal.R16,
  color: colors.text05,
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '0 0.8rem',
});

export const verticalLine = style({
  position: 'relative',
  height: '100%',
  selectors: {
    '&::after': {
      content: '""',
      width: '0.1rem',
      height: '1.6rem',
      position: 'absolute',
      top: '50%',
      right: '0',
      transform: 'translateY(-50%)',
      backgroundColor: colors.line03,
    },
    '&:last-child::after': {
      display: 'none',
    },
  },
});

export const emailWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

export const subTitle = style({
  ...fonts.body.normal.R16,
  color: colors.text03,
});
