import { css, Theme } from '@emotion/react';

export const termContainer = (theme: Theme) => css`
  ${theme.fonts.body.normal.M16};
  color: ${theme.colors.text06};
  background-color: ${theme.colors.field01};
  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  gap: 1.2rem;
`;
