import { style, styleVariants } from '@vanilla-extract/css';

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

export const postCardLayout = style({
  position: 'relative',
  display: 'grid',
  gap: '1.6rem',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateAreas: `
    "header"
    "content"
    "footer"
  `,
  height: '20rem',
  padding: '1.6rem 2rem',
  borderRadius: '1.2rem',

  backgroundColor: colors.field01,

  selectors: {
    '&:hover': {
      boxShadow: '0px 4px 16px rgba(53, 59, 61, 0.08)',
    },
  },

  '@media': {
    'screen and (max-width: 767px)': {
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

export const postHeader = style({
  gridArea: 'header',
  display: 'grid',
  gap: '0.8rem',
  gridTemplateRows: 'auto auto',
  gridTemplateAreas: `
    "location-views"
    "title"
  `,

  '@media': {
    'screen and (max-width: 767px)': {
      gap: '0.2rem',
      gridTemplateAreas: `
        "title"
        "location"
      `,
    },
  },
});

export const postInfoContainer = style({
  gridArea: 'location-views',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  gap: '1rem',

  '@media': {
    'screen and (max-width: 767px)': {
      gridArea: 'location',
      gridTemplateColumns: '1fr',
    },
  },
});

export const postLocation = style([
  textEllipsis.singleLine,
  {
    ...fonts.label.medium.R13,
    color: colors.text03,

    '@media': {
      'screen and (max-width: 767px)': {
        ...fonts.label.large.R14,
      },
    },
  },
]);

export const postViewWrapperDesktop = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
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

export const postFooter = style({
  gridArea: 'footer',
  display: 'grid',

  // 데스크톱: 보상/일시
  gridTemplateColumns: '1fr',
  gridTemplateAreas: `"details"`,

  '@media': {
    'screen and (max-width: 767px)': {
      // 모바일: 보상/일시 + 조회수
      gridTemplateColumns: '1fr auto',
      gridTemplateAreas: `"details views"`,
      alignItems: 'end',
      gap: '1rem',
    },
  },
});

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

export const postViewWrapperMobile = style({
  gridArea: 'views',
  display: 'none',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
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

    '@media': {
      'screen and (max-width: 767px)': {
        ...fonts.label.large.M14,
        color: colors.text07,
      },
    },
  },
]);
