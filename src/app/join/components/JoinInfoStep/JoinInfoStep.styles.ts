import { css, Theme } from '@emotion/react';

export const joinContentContainer = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  border-radius: 1.2rem;
  padding: 3.2rem 4rem;
`;

export const joinButton = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
  border-radius: 1.2rem;
  padding: 1.2rem 0;
  width: 20rem;
  align-items: center;
  margin-bottom: 5.6rem;

  :disabled {
    color: ${theme.colors.text02};
    background-color: ${theme.colors.field04};
  }
`;
