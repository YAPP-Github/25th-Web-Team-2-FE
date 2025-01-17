import { css, Theme } from '@emotion/react';

export const inputContainer = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    ${theme.fonts.label.large.M14};
    color: ${theme.colors.text06};
    display: flex;
    gap: 0.4rem;
  }

  input {
    ${theme.fonts.body.normal.M16};
    color: ${theme.colors.text06};
    border: 0.1rem solid ${theme.colors.line01};
    padding: 1.6rem;
    border-radius: 1.2rem;

    :disabled {
      color: ${theme.colors.text03};
      background-color: ${theme.colors.field03};
    }

    ::placeholder {
      color: ${theme.colors.text03};
    }

    :focus {
      outline: 0.1rem solid ${theme.colors.lineTinted};
    }
  }

  input[aria-invalid='true'] {
    outline: 0.1rem solid ${theme.colors.textAlert};
  }
`;

export const univInputWrapper = (theme: Theme) => css`
  position: relative;
  background-color: ${theme.colors.field01};
  border-radius: 1rem;

  input {
    width: 100%;
  }

  button:disabled {
    background-color: ${theme.colors.field04};
    color: ${theme.colors.text02};
  }
`;

export const required = (theme: Theme) => css`
  color: ${theme.colors.textAlert};
`;

export const univAuthButton = (theme: Theme) => css`
  ${theme.fonts.label.large.SB14};
  position: absolute;
  right: 1.2rem;
  top: 1rem;
  padding: 0.7rem 1.6rem;
  border-radius: 1rem;
  color: ${theme.colors.text01};
  background-color: ${theme.colors.primaryMint};
  border: none;

  :disabled {
    color: ${theme.colors.text02};
    background-color: ${theme.colors.field04};
  }
`;

export const editButton = (theme: Theme) => css`
  color: ${theme.colors.text06};
  background-color: ${theme.colors.field01};
  border: 0.1rem solid ${theme.colors.line02};
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

export const errorMessage = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};
  color: ${theme.colors.textAlert};
`;

export const authInputContainer = css`
  display: flex;
  flex-direction: column;
`;

export const sendAgainButton = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text03};
  text-decoration-line: underline;
  align-self: flex-end;
`;
