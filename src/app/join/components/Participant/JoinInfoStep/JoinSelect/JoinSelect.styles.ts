import { css, Theme } from '@emotion/react';

export const triggerWrapper = (theme: Theme) => css`
  ${theme.fonts.body.normal.M16};
  color: ${theme.colors.text06};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  border-radius: 1.2rem;
  padding: 1.6rem;
  background-color: ${theme.colors.field01};
  cursor: pointer;
  width: 100%;

  &[data-placeholder] {
    ${theme.fonts.body.normal.M16};
    color: ${theme.colors.text02};
  }

  &[aria-invalid='true'] {
    outline: 0.1rem solid ${theme.colors.textAlert};
  }
`;

export const selectContent = (theme: Theme) => css`
  width: 23.6rem;
  max-height: 34rem;

  padding: 1rem 0.8rem;

  background-color: ${theme.colors.field01};
  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  box-shadow: 0px 4px 16px rgba(53, 59, 61, 0.2);
  overflow: hidden;
`;

export const selectList = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const selectItem = (theme: Theme) => css`
  ${theme.fonts.body.normal.M16};
  color: ${theme.colors.text06};
  display: flex;
  padding: 0.6rem 1.2rem;
  align-items: center;
  border-radius: 1.2rem;
  cursor: pointer;

  &[data-highlighted] {
    background-color: ${theme.colors.field02};
    outline: none;
  }

  &[data-state='checked'] {
    background-color: ${theme.colors.primaryTinted};
    color: ${theme.colors.textPrimary};

    border: 0.1rem solid ${theme.colors.textPrimary};
  }
`;
