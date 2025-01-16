import { css, Theme } from '@emotion/react';

export const checkboxLayout = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const checkboxWrapper = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  div {
    display: flex;
    gap: 0.4rem;
  }

  span {
    user-select: none;
  }
`;

export const allCheckWrapper = (theme: Theme) => css`
  border-bottom: 0.1rem solid ${theme.colors.line01};
  padding-bottom: 1.6rem;
`;

export const checkbox = css`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const requiredCheckboxText = (theme: Theme) => css`
  color: ${theme.colors.textPrimary};
`;
