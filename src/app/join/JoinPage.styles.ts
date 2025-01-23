import { css, Theme } from '@emotion/react';

export const joinLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding-top: 8.4rem;
  flex-grow: 1;
`;

export const contentContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

export const titleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const joinContentContainer = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  border-radius: 1.2rem;
  padding: 3.2rem 4rem;
`;

export const joinTitle = (theme: Theme) => css`
  ${theme.fonts.title.medium.SB20};
  color: ${theme.colors.text06};
`;

export const progressBar = (theme: Theme) => css`
  width: 8rem;
  height: 0.6rem;
  background-color: ${theme.colors.field03};
  border-radius: 3rem;
`;

export const progressBarContainer = (theme: Theme) => css`
  width: 8rem;
  height: 0.6rem;
  background-color: ${theme.colors.field03};
  border-radius: 0.6rem;
`;

export const progressBarFill = (theme: Theme) => css`
  height: 100%;
  background-color: ${theme.colors.primaryMint};
  border-radius: 0.6rem;
  transition: width 1s;
`;

export const joinForm = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;
