import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const myPostsLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.2rem',
});

export const listItem = style({
  display: 'grid',
  gap: '0.8rem',
  gridTemplateAreas: `
  "views menu"
  "content content"
  `,

  position: 'relative',
  selectors: {
    '&::after': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '0.1rem',
      bottom: '-1.6rem',
      left: '0',
      backgroundColor: colors.line01,
    },
    '&:last-child::after': {
      display: 'none',
    },
  },
});

export const viewsArea = style({
  gridArea: 'views',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const postViews = style({
  ...fonts.label.large.R14,
  color: colors.text03,
});

export const menuArea = style({
  gridArea: 'menu',
  justifySelf: 'end',
});

export const contentArea = style({
  gridArea: 'content',
});

export const contentWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  flexWrap: 'nowrap',
});

export const recruitStatusBadge = style({
  ...fonts.label.small.SB12,
  color: colors.text05,
  backgroundColor: colors.field04,
  padding: '0.6rem 0.85rem',
  borderRadius: '3rem',
  whiteSpace: 'nowrap',
});

export const postTitle = style({
  ...fonts.body.normal.M16,
  color: colors.text06,

  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
});
