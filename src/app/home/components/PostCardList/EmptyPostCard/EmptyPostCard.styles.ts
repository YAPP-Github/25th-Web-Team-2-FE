import { css, Theme } from '@emotion/react';

export const emptyPostCardLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  height: 30.8rem;
`;

export const emptyPostCardContent = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: center;
`;

export const emptyListTitle = (theme: Theme) => css`
  ${theme.fonts.body.normal.M16};
  color: ${theme.colors.text04};
`;

export const emptyListContent = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.text04};
`;
