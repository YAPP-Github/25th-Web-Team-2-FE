import { css, Theme } from '@emotion/react';

export const dialogContent = (theme: Theme) => css`
  width: 49rem;
  height: 16.4rem;

  background-color: ${theme.colors.field01};
  border-radius: 1.2rem;

  padding: 3.2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  box-shadow: 0px 4px 8px 0px rgba(0, 22, 54, 0.31);
`;

export const dialogTitle = (theme: Theme) => css`
  ${theme.fonts.title.medium.SB20};
  color: ${theme.colors.text06};
  text-align: center;

  margin-bottom: 3.2rem;
`;

export const buttonGroup = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 0.8rem;
`;

export const modalButtonStyle = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};

  width: 100%;
  height: 4.8rem;

  border-radius: 1.2rem;
  padding: 1.2rem 0;
  text-align: center;

  cursor: pointer;
`;

export const cancelButton = (theme: Theme) => css`
  background-color: ${theme.colors.field04};
  color: ${theme.colors.text06};
`;

export const confirmButton = (theme: Theme) => css`
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
`;
