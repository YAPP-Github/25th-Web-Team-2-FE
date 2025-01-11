import { css } from '@emotion/react';

export const bannerLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`;

export const bannerWrapper = css`
  position: relative;
  height: 15vh;
  display: flex;
  align-items: center;
`;

export const navigationLeft = css`
  position: absolute;
  left: 1.6rem;
`;

export const bannerCarousel = css`
  position: relative;
  overflow: hidden;
`;

export const carouselContainer = css`
  display: flex;
  transition: all 1s;
`;

export const navigationRight = css`
  position: absolute;
  right: 1.6rem;
`;

export const bannerImage = css`
  width: 100%;
  height: auto;
`;

export const slideCircleContainer = css`
  display: flex;
  gap: 0.6rem;
`;

export const slideCircle = css`
  border-radius: 50%;
  width: 0.6rem;
  height: 0.6rem;
`;
