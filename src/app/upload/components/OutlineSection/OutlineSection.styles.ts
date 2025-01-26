import { css, Theme } from '@emotion/react';

export const outlineFormLayout = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 10.2rem 10.2rem auto;

  grid-column-gap: 3.2rem;
  grid-row-gap: 2.8rem;

  margin: 0 auto;
`;

export const radioGroup = css`
  display: flex;
  flex-flow: row nowrap;
  gap: 0.8rem;
`;

export const customRadioGroup = css`
  display: flex;
  gap: 1rem;
`;

export const customRadioButton = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};

  width: 14.533rem;
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
`;

export const activeRadioButton = (theme: Theme) => css`
  border: 0.1rem solid ${theme.colors.lineTinted};

  background-color: ${theme.colors.primaryTinted};
  color: ${theme.colors.textPrimary};

  &:hover {
    background-color: ${theme.colors.primaryTinted};
  }
`;

export const uploadInputContainer = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.8rem;
`;

export const disabledInput = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  color: ${theme.colors.text02};
`;
