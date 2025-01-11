import { css, Theme } from '@emotion/react';

export const dialogOverlay = (theme: Theme) => css`
  background: rgba(0, 22, 54, 0.31);
  position: fixed;
  inset: 0;

  z-index: ${theme.zIndex.dialogOverlay};
`;

export const closeButton = css`
  cursor: pointer;

  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
`;
