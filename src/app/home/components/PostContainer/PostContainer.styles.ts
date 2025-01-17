import { css, Theme } from '@emotion/react';

export const postContainerLayout = css`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const postContainerTitle = (theme: Theme) => css`
  ${theme.fonts.title.medium.SB20};
  color: ${theme.colors.text06};
`;

export const postCardContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-height: 40rem;
`;

export const totalPostCount = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};
  color: ${theme.colors.text03};
`;
