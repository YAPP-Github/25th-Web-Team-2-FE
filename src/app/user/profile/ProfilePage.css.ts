import { style } from '@vanilla-extract/css';

export const profilePageLayout = style({
  display: 'flex',
  maxWidth: '56rem',

  width: '100%',

  margin: '0 auto',
  minHeight: '100vh',

  paddingBottom: '18.2rem', // 12.2 + 6

  '@media': {
    'screen and (max-width: 1023px)': {
      padding: '0 2rem 18.2rem',
    },

    'screen and (max-width: 767px)': {
      paddingBottom: '6rem',
    },
  },
});

export const joinLayout = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.2rem',
  paddingTop: '6rem',
  flexGrow: 1,
});
