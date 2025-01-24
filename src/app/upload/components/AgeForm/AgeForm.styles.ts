import { css, Theme } from '@emotion/react';

export const textInputContainer = () => css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;

  width: 100%;
`;

export const inputStyle = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};

  width: 17.2rem;
  height: 2.2rem;

  text-align: center;

  border: none;
  outline: none;

  &::placeholder {
    color: ${theme.colors.text02};
  }
`;
