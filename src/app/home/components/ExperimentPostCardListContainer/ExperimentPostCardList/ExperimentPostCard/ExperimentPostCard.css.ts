import { keyframes, style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const textEllipsis = styleVariants({
  // 한 줄 말줄임표
  singleLine: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'break-word',
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

const fadeIn = keyframes({
  '0%': {
    opacity: 0.3,
  },
  '100%': {
    opacity: 1,
  },
});

export const postCardLayout = style({
  position: 'relative',
  display: 'grid',
  gridTemplateRows: 'auto 0.8rem auto 1.6rem 1fr 1.6rem auto',
  gridTemplateColumns: '1fr auto',
  gridTemplateAreas: `
    "location views"
    ". ."
    "title title"
    ". ."
    "content content"
    ". ."
    "details ."
  `,

  height: '20rem',
  padding: '1.6rem 2rem',
  borderRadius: '1.2rem',
  backgroundColor: colors.field01,
  animation: `${fadeIn} 0.2s ease-out`,

  selectors: {
    '&:hover': {
      boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.08)',
    },
  },

  '@media': {
    'screen and (max-width: 767px)': {
      gridTemplateRows: 'auto 0.2rem auto 1.6rem 1fr 1.6rem auto',
      gridTemplateColumns: '1fr auto',
      gridTemplateAreas: `
        "title title"
        ". ."
        "location ."
        ". ."
        "content content"
        ". ."
        "details views"
      `,

      height: 'auto',
      padding: '1.6rem',

      selectors: {
        '&::after': {
          content: '',
          display: 'block',
          width: 'calc(100% - 1.6rem)',
          height: '0.1rem',
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: 'translateY(-50%)',
          backgroundColor: colors.line01,
        },
      },
    },
  },
});

export const postLocation = style([
  textEllipsis.singleLine,
  {
    gridArea: 'location',
    ...fonts.label.medium.R13,
    color: colors.text03,

    '@media': {
      'screen and (max-width: 767px)': {
        ...fonts.label.large.R14,
      },
    },
  },
]);

export const postViewsContainer = style({
  gridArea: 'views',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',

  '@media': {
    'screen and (max-width: 767px)': {
      alignSelf: 'end',
    },
  },
});

export const postViews = style({
  ...fonts.label.medium.R13,
  color: colors.text03,

  '@media': {
    'screen and (max-width: 767px)': {
      ...fonts.label.large.R14,
    },
  },
});

export const postTitle = style([
  textEllipsis.twoLines,
  {
    gridArea: 'title',
    ...fonts.title.small.SB18,
    color: colors.text06,
  },
]);

export const postDetailsContainer = style({
  gridArea: 'details',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',

  '@media': {
    'screen and (max-width: 767px)': {
      gap: '0.3rem',
    },
  },
});

export const contactedPostTag = style({
  gridArea: 'details',
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

  '@media': {
    'screen and (max-width: 767px)': {
      ...fonts.label.large.M14,
    },
  },
});

export const postReward = style([
  textEllipsis.singleLine,
  {
    ...fonts.label.medium.SB13,
    color: colors.primaryMint,

    '@media': {
      'screen and (max-width: 767px)': {
        ...fonts.label.large.M14,
      },
    },
  },
]);

export const postDate = style([
  textEllipsis.singleLine,
  {
    ...fonts.label.medium.M13,
    color: colors.text04,
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',

    '@media': {
      'screen and (max-width: 767px)': {
        ...fonts.label.large.M14,
        color: colors.text07,
      },
    },
  },
]);
