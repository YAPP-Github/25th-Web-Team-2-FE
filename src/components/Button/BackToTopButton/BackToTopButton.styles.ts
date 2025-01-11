import { css, Theme } from '@emotion/react';

export const backToTopButton = (theme: Theme) => css`
  width: 4.8rem;
  height: 4.8rem;

  background-color: ${theme.colors.field01};

  border-radius: 5.143rem;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0rem 0.2rem 0.3rem rgba(0, 0, 0, 0.03);

  cursor: pointer;

  position: fixed;
  bottom: 2.8rem;
  right: 3rem;

  z-index: ${theme.zIndex.backToTopButton};
`;
