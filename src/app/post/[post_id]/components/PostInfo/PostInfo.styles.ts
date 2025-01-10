import { css, Theme } from '@emotion/react';

export const postInfoLayout = (theme: Theme) => css`
  margin-top: 3.8rem;

  width: 100%;
  height: 6rem;

  h2 {
    ${theme.fonts.title.large.SB24};
  }
`;

export const postSubInfo = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text03};

  margin-top: 0.6rem;

  display: flex;
  flex-flow: row nowrap;
  gap: 1.6rem;

  position: relative;

  > div {
    position: relative;
  }

  > div:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -0.8rem;
    transform: translateY(-50%);
    width: 0.1rem;
    height: 0.8rem;
    background-color: ${theme.colors.line02};
  }
`;

export const viewsContainer = css`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.3rem;
`;

export const postHeaderContainer = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

export const buttonStyles = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text03};
  cursor: pointer;
`;

export const editButton = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text03};
  cursor: pointer;

  position: relative;
  margin-right: 1.6rem;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(100% + 0.8rem);
    transform: translateY(-50%);
    width: 0.1rem;
    height: 0.8rem;
    background-color: ${theme.colors.line02};
  }
`;
