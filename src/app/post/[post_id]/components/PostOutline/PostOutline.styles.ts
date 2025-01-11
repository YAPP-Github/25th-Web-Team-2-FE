import { css, Theme } from '@emotion/react';

export const postOutlineLayout = (theme: Theme) => css`
  min-width: 34rem;
  max-width: 44rem;
  height: 55.4rem;

  border-radius: 1.2rem;
  background-color: ${theme.colors.field01};

  position: sticky;
  top: 12rem;

  padding: 2.4rem 3rem;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  h3 {
    ${theme.fonts.title.small.SB18};
    color: ${theme.colors.text07};

    margin-bottom: 2rem;
  }
`;

export const postOutlineContent = (theme: Theme) => css`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 1.6rem 1.2rem;
  margin-left: -1.6rem;

  th,
  td {
    text-align: left;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  th {
    ${theme.fonts.body.normal.R16};
    color: ${theme.colors.text03};
    width: 6rem;
  }

  td {
    ${theme.fonts.body.normal.M16};
    color: ${theme.colors.text06};
    white-space: nowrap;
    width: 20.4rem;
  }
`;

export const targetRow = css`
  height: 7.2rem;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: normal;
  }
`;

export const textWrapRow = css`
  height: 4.8rem;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: normal;
  }
`;

export const divider = (theme: Theme) => css`
  width: 100%;
  height: 0.1rem;
  background-color: ${theme.colors.line02};
  margin: 1.2rem 0;
`;

export const participationCount = (theme: Theme) => css`
  position: relative;
  margin-right: 3.2rem;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(100% + 1.6rem);
    transform: translateY(-50%);
    width: 0.1rem;
    height: 0.8rem;
    background-color: ${theme.colors.line02};
  }
`;

export const checkButton = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};

  height: 4rem;
  margin-top: 2rem;

  border-radius: 1.2rem;
  background-color: ${theme.colors.field09};
  color: ${theme.colors.text01};

  cursor: pointer;
`;
