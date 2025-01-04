import { css, Theme } from '@emotion/react';

export const headerLayout = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.8rem;
`;

export const headerContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10rem;
`;

export const image = css`
  height: auto;
`;

export const buttonContainer = css`
  height: 100%;
  display: flex;
  gap: 0.8rem;
`;

export const contactButton = (theme: Theme) => css`
  ${theme.fonts.label.medium.SB14};
  background-color: ${theme.colors.primaryTinted};
  color: ${theme.colors.textPrimary};
  padding: 0.6rem 1.4rem;
  border-radius: 1.2rem;
`;

export const loginButton = (theme: Theme) => css`
  ${theme.fonts.label.medium.SB14};
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
  padding: 0.6rem 1.4rem;
  border-radius: 1.2rem;
`;
