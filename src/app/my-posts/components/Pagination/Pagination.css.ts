import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.8rem',
  margin: '0 auto',
  width: '100%',
});

export const paginationContent = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
});

export const paginationItem = style({
  ...fonts.label.medium.M13,
  color: colors.text02,
  listStyle: 'none',
});

export const paginationLink = style({
  width: '2.4rem',
  height: '2.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  fontSize: '1.4rem',
  cursor: 'pointer',
  borderRadius: '0.8rem',
  selectors: {
    '&:hover': {
      backgroundColor: colors.field02,
    },
  },
});

export const active = style({
  ...fonts.label.medium.SB13,
  color: colors.primaryMint,
});

export const paginationPrevious = style({
  display: 'flex',
  alignItems: 'center',
});

export const paginationNext = style({
  display: 'flex',
  alignItems: 'center',
});

export const paginationEllipsis = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
});

export const icon = style({
  width: '1.6rem',
  height: '1.6rem',
});
