import { css, Theme } from '@emotion/react';

export const toastLayout = (theme: Theme) => css`
  color: ${theme.colors.text06};

  height: 5.2rem;

  background-color: ${theme.colors.fieldToast};
  color: ${theme.colors.text06};
  box-shadow: 0px 4px 16px rgba(53, 59, 61, 0.2);

  border-radius: 8rem;

  padding: 1.4rem 2.4rem;

  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  z-index: ${theme.zIndex.toastContent};
`;

export const toastTitle = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};
  color: ${theme.colors.text01};

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 1rem;

  width: max-content;
`;

export const toastViewport = (theme: Theme) => css`
  position: fixed;
  top: 6rem;
  left: 50%;
  transform: translateX(-50%);

  z-index: ${theme.zIndex.toastViewport};
`;
