import { css, Theme } from '@emotion/react';

export const postOutlineLayout = (theme: Theme) => css`
  min-width: 34rem;
  height: 49rem;

  border-radius: 1.2rem;
  background-color: ${theme.colors.field01};

  position: sticky;

  top: 12rem;
`;
