import { css, Theme } from '@emotion/react';

export const loginLayout = css`
  display: flex;
  flex-direction: column;
  gap: 6.5rem;
  padding-top: 8.4rem;
`;

export const descriptionWrapper = (theme: Theme) => css`
  ${theme.fonts.title.medium.SB20};
  color: ${theme.colors.text06};
`;

export const sloganContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const sloganWrapper = (theme: Theme) => css`
  ${theme.fonts.title.medium.SB20};
  color: ${theme.colors.text06};
  text-align: center;
`;

export const loginCardContainer = css`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.8rem;
  min-height: 37rem;
`;
