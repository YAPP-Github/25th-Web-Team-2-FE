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

  input,
  textarea {
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

    &[aria-invalid='true'] {
      outline: 0.1rem solid ${theme.colors.textAlert};
    }
  }
`;

export const requiredStar = (theme: Theme) => css`
  color: ${theme.colors.textAlert};
`;

export const errorMessage = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};
  color: ${theme.colors.textAlert};
`;

export const tipWrapper = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  display: flex;
  // justify-content: flex-end;
  color: ${theme.colors.text02};
`;

export const textCount = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  display: flex;
  justify-content: flex-end;
  color: ${theme.colors.text02};
`;

export const tipAlert = (theme: Theme) => css`
  color: ${theme.colors.textPrimary};
`;
