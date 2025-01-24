import { css, Theme } from '@emotion/react';

export const postOutlineLayout = (theme: Theme) => css`
  min-width: 34rem;
  max-width: 44rem;

  height: auto;
  max-height: 60rem;

  border-radius: 1.2rem;
  background-color: ${theme.colors.field01};

  position: sticky;
  top: 12rem;

  padding: 2.4rem 3rem 0 3rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  h3 {
    ${theme.fonts.title.small.SB18};
    color: ${theme.colors.text07};

    position: sticky;
    top: 0;
    background-color: ${theme.colors.field01};

    padding-bottom: 1.6rem;
  }
`;

export const postOutlineContent = (theme: Theme) => css`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 1.6rem 1.2rem;
  margin-left: -1.6rem;

  overflow-y: hidden;

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

export const otherConditionWrapper = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};
  color: ${theme.colors.text05};
  background-color: ${theme.colors.field02};

  border-radius: 0.8rem;
  width: 28rem;

  padding: 1.2rem 1.4rem;

  display: flex;
  justify-content: left;
  align-items: center;
`;

export const textWrapRow = css`
  height: auto;
  max-height: 4.8rem;

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
    height: 1rem;
    background-color: ${theme.colors.field08};
  }
`;

export const checkButton = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};

  width: 100%;
  height: 4rem;

  border-radius: 1.2rem;
  background-color: ${theme.colors.field09};
  color: ${theme.colors.text01};

  cursor: pointer;
`;

export const disabledCheckButton = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};

  width: 100%;
  height: 4rem;

  border-radius: 1.2rem;
  background-color: ${theme.colors.field04};
  color: ${theme.colors.text03};
`;

export const scrollableContent = css`
  flex: 1;
  position: relative;
  overflow-y: auto;

  overflow-x: hidden;
`;

export const ButtonContainer = (theme: Theme) => css`
  width: 34rem;

  height: 8.8rem;

  position: sticky;
  bottom: 0;

  padding: 0 3rem;
  margin-left: -3rem;

  background-color: ${theme.colors.field01};

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
`;
