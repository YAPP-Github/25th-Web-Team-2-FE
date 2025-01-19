import { css, Theme } from '@emotion/react';

export const joinSuccessLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.2rem;
  height: calc(100vh - 12.2rem);
`;

export const title = (theme: Theme) => css`
  ${theme.fonts.title.large.SB28};
  color: ${theme.colors.text06};
`;

export const image = css`
  margin: 3.2rem 0;
`;

export const homeLink = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
  border-radius: 1.2rem;
  padding: 1.2rem 3.35rem;
  margin-top: 2.6rem;
`;
