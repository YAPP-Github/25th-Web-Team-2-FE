import { style } from '@vanilla-extract/css';

export const bannerLayout = style({
  position: 'relative',
  height: '15vh',
  display: 'flex',
  alignItems: 'center',
  width: '100%',

  '@media': {
    'screen and (max-width: 767px)': {
      height: 'auto',
      padding: '1.2rem 1.6rem',
    },
  },
});

export const navigationLeft = style({
  position: 'absolute',
  left: '1.6rem',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

export const bannerCarousel = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
});

export const carouselContainer = style({
  display: 'flex',
  transition: 'all 1s',
  width: '100%',

  '@media': {
    'screen and (max-width: 767px)': {
      height: '7rem',
    },
  },
});

export const navigationRight = style({
  position: 'absolute',
  right: '1.6rem',

  '@media': {
    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

export const bannerImage = style({
  borderRadius: '1.2rem',
});

export const slideCircleContainer = style({
  display: 'flex',
  gap: '0.6rem',
});

export const slideCircle = style({
  borderRadius: '50%',
  width: '0.6rem',
  height: '0.6rem',
});
