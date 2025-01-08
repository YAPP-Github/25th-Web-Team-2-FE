import { css, Theme } from '@emotion/react';

export const postContentLayout = (theme: Theme) => css`
  min-width: 64.8rem;

  padding: 2.4rem 3rem;

  flex: 1;

  background-color: ${theme.colors.field01};
  border-radius: 1.2rem;

  h3 {
    ${theme.fonts.title.small.SB18};
    color: ${theme.colors.text07};

    margin-bottom: 2rem;
  }
`;

export const postContentWrapper = (theme: Theme) => css`
  ${theme.fonts.body.normal.R16};
  color: ${theme.colors.text06};

  white-space: pre-wrap;
  word-break: break-word;
`;
