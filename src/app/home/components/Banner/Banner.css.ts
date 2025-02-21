import { style } from '@vanilla-extract/css';

export const bannerLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.2rem',
});

export const bannerWrapper = style({
  position: 'relative',
  height: '15vh',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

export const navigationLeft = style({
  position: 'absolute',
  left: '1.6rem',
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
});

export const navigationRight = style({
  position: 'absolute',
  right: '1.6rem',
});

export const bannerImage = style({
  width: '100%',
  height: 'auto',
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
