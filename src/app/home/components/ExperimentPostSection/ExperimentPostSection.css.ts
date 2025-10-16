import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const postContainerLayout = style({
  display: 'grid',
  gridTemplateRows: 'auto 1.6rem auto 1.6rem auto 0.6rem auto',
  gridTemplateAreas: `
    "title title"
    ". ."
    "filters checkbox"
    ". ."
    "count count"
    ". ."
    "posts posts"
  `,
  gridTemplateColumns: '1fr auto',

  marginTop: '2rem',
  background: 'transparent',
  paddingBottom: '12.2rem', // footer

  '@media': {
    'screen and (max-width: 767px)': {
      gridTemplateRows: 'auto 0rem auto 0rem auto 0.6rem auto',
      gridTemplateAreas: `
        "divider divider"
        ". ."
        "filters filters"
        ". ."
        "count checkbox"
        ". ."
        "posts posts"
      `,
      marginTop: '0',
      paddingBottom: '0',
    },
  },
});

export const postContainerTitleDesktop = style({
  ...fonts.title.medium.SB20,
  color: colors.text06,
  gridArea: 'title',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

export const horizontalLineMobile = style({
  display: 'none',
  gridArea: 'divider',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'block',
      width: '100%',
      height: '1.2rem',
      backgroundColor: colors.fieldBg,
    },
  },
});

export const filterWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gridArea: 'filters',

  '@media': {
    'screen and (max-width: 767px)': {
      padding: '1.6rem',
      overflowX: 'auto',
    },
  },
});

export const recruitCheckLabel = style({
  ...fonts.label.large.SB14,
  color: colors.text06,
});

export const recruitCheckWrapper = style({
  gridArea: 'checkbox',
  display: 'flex',
  alignItems: 'center',

  '@media': {
    'screen and (max-width: 767px)': {
      padding: '0.4rem 1.6rem',
      justifyContent: 'flex-end',
    },
  },
});

export const totalPostCountWrapper = style({
  gridArea: 'count',
  display: 'flex',
  alignItems: 'center',

  '@media': {
    'screen and (max-width: 767px)': {
      padding: '0.4rem 1.6rem',
      justifyContent: 'flex-start',
    },
  },
});

export const totalPostCount = style({
  ...fonts.label.large.R14,
  color: colors.text03,
});

export const postListContainer = style({
  gridArea: 'posts',
});
