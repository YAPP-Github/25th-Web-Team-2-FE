import { css, Theme } from '@emotion/react';

export const joinLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  margin-top: 8.4rem;
`;

export const contentContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

export const titleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const joinContentContainer = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  width: 100%;
  height: 67.6rem;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  border-radius: 1.2rem;
  padding: 3.2rem 4rem;
`;

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

export const required = (theme: Theme) => css`
  color: ${theme.colors.textAlert};
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

export const tipWrapper = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};
  display: flex;
  gap: 0.4rem;
  color: ${theme.colors.text02};
`;

export const tip = (theme: Theme) => css`
  color: ${theme.colors.textPrimary};
`;

export const joinContainer = css`
  display: flex;
  flex-direction: column;
`;

export const joinTitle = (theme: Theme) => css`
  ${theme.fonts.title.medium.SB20};
  color: ${theme.colors.text06};
`;

export const progressBar = (theme: Theme) => css`
  width: 8rem;
  height: 0.6rem;
  background-color: ${theme.colors.field03};
  border-radius: 3rem;
`;

export const progressBarContainer = (theme: Theme) => css`
  width: 8rem;
  height: 0.6rem;
  background-color: ${theme.colors.field03};
  border-radius: 0.6rem;
`;

export const progressBarFill = (theme: Theme) => css`
  height: 100%;
  background-color: ${theme.colors.primaryMint};
  border-radius: 0.6rem;
`;

export const nextButton = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
  border-radius: 1.2rem;
  padding: 1.2rem 0;
  width: 20rem;

  :disabled {
    color: ${theme.colors.text02};
    background-color: ${theme.colors.field04};
  }
`;
