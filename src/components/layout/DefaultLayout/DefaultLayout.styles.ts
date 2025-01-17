import { Theme } from '@emotion/react';
import { css } from '@emotion/react';

export const defaultLayoutContainer = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  padding-bottom: 5.6rem;
`;

export const defaultLayout = (theme: Theme) => css`
  width: 100rem;
  margin: 0 auto;
  background-color: ${theme.colors.field02};
`;
