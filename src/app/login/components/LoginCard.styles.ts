import { css, Theme } from '@emotion/react';

export const loginCardLayout = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  width: 32.7rem;

  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  padding: 3rem;
  justify-content: space-between;
`;

export const cardTitleContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const badge = (theme: Theme) => css`
  ${theme.fonts.label.large.SB14};
  width: fit-content;
  padding: 0.4rem 0.8rem;
  border-radius: 1.2rem;
`;

export const buttonContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const loginButton = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};
  background-color: ${theme.colors.field01};
  color: ${theme.colors.text06};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.8rem;
  border-radius: 0.8rem;
`;
