import { style } from '@vanilla-extract/css';

export const experimentPostLayout = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1.6rem 1.2rem',

  '@media': {
    'screen and (max-width: 767px)': {
      gap: '0',
      gridTemplateColumns: '1fr',
      gridTemplateAreas: `
        "title"
        "location"
        "reward"
        "date views"
      `,
    },
  },
});
