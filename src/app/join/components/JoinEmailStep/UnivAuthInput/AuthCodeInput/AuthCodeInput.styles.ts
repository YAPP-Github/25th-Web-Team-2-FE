import { css, Theme } from '@emotion/react';

export const authInputLayout = css`
  display: flex;
  flex-direction: column;
`;

export const authTimerWrapper = (theme: Theme) => css`
  position: absolute;
  right: 1.2rem;
  top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  span {
    ${theme.fonts.label.large.M14};
    color: ${theme.colors.text03};
  }
`;

export const authCodeButton = (theme: Theme) => css`
  ${theme.fonts.label.large.SB14};
  padding: 0.7rem 1.6rem;
  border-radius: 1rem;
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};

  :disabled {
    background-color: ${theme.colors.field04};
    color: ${theme.colors.text02};
  }
`;

export const sendAgainButton = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text03};
  text-decoration-line: underline;
  align-self: flex-end;
`;
