import { css, Theme } from '@emotion/react';

export const customRadioGroup = css`
  display: flex;
  flex-flow: row nowrap;
  gap: 0.8rem;
`;

export const customRadioButton = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};

  flex-grow: 1;
  height: 4.8rem;

  padding: 1rem 2rem;

  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  background-color: ${theme.colors.field01};

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.field02};
  }

  &[aria-invalid='true'] {
    outline: 0.1rem solid ${theme.colors.textAlert};
  }
`;

export const activeRadioButton = (theme: Theme) => css`
  border: 0.1rem solid ${theme.colors.lineTinted};

  background-color: ${theme.colors.primaryTinted};
  color: ${theme.colors.textPrimary};

  &:hover {
    background-color: ${theme.colors.primaryTinted};
  }
`;

export const errorRadioButton = (theme: Theme) => css`
  border-color: ${theme.colors.textAlert};
`;
