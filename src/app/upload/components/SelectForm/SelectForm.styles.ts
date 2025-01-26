import { css, Theme } from '@emotion/react';

export const selectInputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const selectTrigger = (theme: Theme, disabled: boolean, isError: boolean) => css`
  ${theme.fonts.label.large.R14};

  width: 100%;
  height: 4.8rem;
  padding: 0.8rem 1.2rem;

  border: 0.1rem solid ${isError ? theme.colors.textAlert : theme.colors.line01};
  border-radius: 1.2rem;

  color: ${disabled ? theme.colors.text02 : theme.colors.text06};
  background-color: ${disabled ? theme.colors.field02 : 'transparent'};

  display: flex;
  align-items: center;
  justify-content: space-between;

  &[data-placeholder] {
    color: ${theme.colors.text02};
  }

  &[data-state='open'] {
    border: 0.1rem solid ${theme.colors.primaryMint};
    border: 0.1rem solid ${isError ? theme.colors.textAlert : theme.colors.primaryMint};
    outline: none;
  }
`;

export const selectContent = (theme: Theme) => css`
  width: 45.2rem;
  background-color: ${theme.colors.field01};
  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  box-shadow: 0rem 0.4rem 1rem rgba(0, 0, 0, 0.1);

  padding: 0.8rem 0.8rem;
`;

export const selectItem = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  height: 3.6rem;
  padding: 0.7rem 2rem;
  cursor: pointer;
  outline: none;
  margin-bottom: 0.8rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  &[data-highlighted] {
    background-color: ${theme.colors.field02};
    border-radius: 1.2rem;
  }

  &[data-state='checked'] {
    background-color: ${theme.colors.primaryTinted};
    color: ${theme.colors.textPrimary};

    border-radius: 1.2rem;
    border: 0.1rem solid ${theme.colors.textPrimary};
  }
`;

export const formMessage = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.textAlert};
  margin: 0;
`;
