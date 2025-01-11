import { css, Theme } from '@emotion/react';

export const triggerWrapper = (theme: Theme) => css`
  ${theme.fonts.label.large.SB14};
  color: ${theme.colors.text06};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  border-radius: 1.2rem;
  padding: 0.5rem 1.4rem;
  background-color: ${theme.colors.field01};
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 16px rgba(53, 59, 61, 0.2);
  }
`;

export const contentContainer = (theme: Theme) => css`
  position: relative;
  top: 3.6rem;
  width: 10rem;
  padding: 0.8rem;
  background-color: ${theme.colors.field01};
  border-radius: 0.8rem;
  box-shadow: 0px 4px 16px rgba(53, 59, 61, 0.2);
  overflow: hidden;
`;

export const selectItem = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text06};
  display: flex;
  padding-left: 1.2rem;
  align-items: center;
  height: 3.4rem;
  border-radius: 1.2rem;
  cursor: pointer;

  &[data-highlighted] {
    background-color: ${theme.colors.field02};
    outline: none;
  }
`;
