import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const textEllipsis = styleVariants({
  // 한 줄 말줄임표
  singleLine: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
    whiteSpace: 'nowrap',
  },

  // 두 줄 말줄임표
  twoLines: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'break-word',
  },
});

export const postCardLayout = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '1.6rem',

  border: 'none',
  borderRadius: '1.2rem',

  height: '20rem',
  padding: '1.6rem 2rem',
  backgroundColor: colors.field01,

  overflow: 'hidden',

  selectors: {
    '&:hover': {
      boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.08)',
    },
  },
});

export const postHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const postCardHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1.6rem',
});

export const postLocation = style({
  ...fonts.label.medium.R13,
  color: colors.text03,
});

export const postCardRightHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const postViews = style({
  ...fonts.label.medium.R13,
  color: colors.text03,
});

export const postTitle = style([
  textEllipsis.twoLines,
  {
    ...fonts.title.small.SB18,
    color: colors.text06,
  },
]);

export const contactedPostTag = style({
  width: 'fit-content',
  padding: '0.6rem 0.85rem',
  ...fonts.label.small.SB12,
  color: colors.text05,
  backgroundColor: colors.field03,
  borderRadius: '3rem',
});

export const postRewardContainer = style({
  display: 'flex',
  gap: '0.8rem',
  alignItems: 'center',
});

export const announceText = style({
  ...fonts.label.medium.M13,
  color: colors.text03,
  whiteSpace: 'nowrap',
});

export const postReward = style([
  textEllipsis.singleLine,
  {
    ...fonts.label.medium.SB13,
    color: colors.primaryMint,
  },
]);

export const postDate = style([
  textEllipsis.singleLine,
  {
    ...fonts.label.medium.M13,
    color: colors.text04,
  },
]);
