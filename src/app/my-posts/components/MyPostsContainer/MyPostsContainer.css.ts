import { style } from '@vanilla-extract/css';

import { fonts } from '@/styles/fonts.css';

export const myPostContainerLayout = style({});

export const myPostsHeader = style({
  ...fonts.title.medium.SB20,
  marginBottom: '2rem',
});
