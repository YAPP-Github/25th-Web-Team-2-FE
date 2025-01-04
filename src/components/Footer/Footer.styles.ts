import { css, Theme } from '@emotion/react';

export const footerLayout = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 2rem 0;
`;

export const buttonContainer = (theme: Theme) => css`
  display: flex;
  gap: 1.2rem;

  button {
    ${theme.fonts.label.medium.SB14};
    color: ${theme.colors.text04};
  }
`;

export const borderButton = (theme: Theme) => css`
  border-left: 1px solid ${theme.colors.line03};
  border-right: 1px solid ${theme.colors.line03};
`;

export const verticalLine = (theme: Theme) => css`
  position: relative;

  ::after {
    content: '';
    width: 0.1rem;
    height: 80%;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: ${theme.colors.line03};
  }

  :last-child::after {
    display: none;
  }
`;

export const textContainer = (theme: Theme) => css`
  ${theme.fonts.label.medium.M14};
  color: ${theme.colors.text02};
`;
