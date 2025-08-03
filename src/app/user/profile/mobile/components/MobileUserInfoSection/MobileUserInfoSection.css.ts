import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const userInfoHeader = style({
  backgroundColor: colors.field10,
  borderRadius: '1.2rem',
  margin: '0.8rem 1.6rem',
  padding: '2.2rem 2rem',
});

export const userInfoContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const userName = style({
  ...fonts.title.medium.SB20,
  color: colors.text01,
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

export const userBadge = recipe({
  base: {
    ...fonts.label.large.B14,
    borderRadius: '1.2rem',
    padding: '0.4rem 0.8rem',
    display: 'inline-flex',
    alignItems: 'center',
  },
  variants: {
    role: {
      PARTICIPANT: {
        color: colors.primaryMint,
        backgroundColor: colors.badgePrimaryTinted,
      },
      RESEARCHER: {
        color: colors.secondaryPink,
        backgroundColor: colors.badgeSecondaryTinted,
      },
    },
  },
});
