import { css, Theme } from '@emotion/react';

export const postInfoTableLayout = (theme: Theme) => css`
  width: 79.8rem;
  margin-top: 2.8rem;

  border-collapse: collapse;
  ${theme.fonts.body.normal.M16};

  table-layout: fixed;

  th,
  td {
    padding-bottom: 1.2rem;
    text-align: left;
    vertical-align: top;
    height: 2.4rem;
    overflow: hidden;
    word-wrap: break-word;
  }

  th {
    color: ${theme.colors.text03};
  }

  td {
    color: ${theme.colors.text05};
    width: 30rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const warningMessage = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.6rem;

  width: fit-content;
  margin-top: 0.8rem;
  padding: 0.4rem 1.2rem;

  background-color: ${theme.colors.fieldAlert};
  border-radius: 1.2rem;

  color: ${theme.colors.textAlert};
`;

export const targetRow = css`
  width: 30rem;
  height: 8.4rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: visible !important;

  p {
    width: 30rem;
    flex-shrink: 0;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: normal;
  }
`;
