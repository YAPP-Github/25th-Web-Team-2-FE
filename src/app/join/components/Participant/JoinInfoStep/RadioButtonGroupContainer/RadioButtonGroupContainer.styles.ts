import { css, Theme } from '@emotion/react';

export const radioButtonGroupContainerLayout = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const labelWrapper = (theme: Theme) => css`
  display: flex;
  gap: 0.4rem;
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text06};
`;

export const requiredStar = (theme: Theme) => css`
  color: ${theme.colors.textAlert};
`;
