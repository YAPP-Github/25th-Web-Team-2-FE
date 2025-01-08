import { css, Theme } from '@emotion/react';

export const postContentLayout = (theme: Theme) => css`
  min-width: 64.8rem;
  background-color: ${theme.colors.field01};
  flex: 1;

  border-radius: 1.2rem;
`;
