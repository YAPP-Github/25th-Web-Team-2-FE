import { css, Theme } from '@emotion/react';

export const dialogOverlay = css`
  background: rgba(0, 22, 54, 0.31);
  position: fixed;
  inset: 0;
`;

export const dialogContent = (theme: Theme) => css`
  width: 49rem;
  height: 24rem;

  box-shadow: 0px 4px 8px 0px rgba(0, 22, 54, 0.31);

  background-color: ${theme.colors.field01};
  border-radius: 1.2rem;

  padding: 2rem 3rem 3rem 3.3rem;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`;

export const dialogTitle = (theme: Theme) => css`
  ${theme.fonts.title.medium.SB20};
  color: ${theme.colors.text06};

  margin-top: 1.2rem;
  margin-right: 1.2rem;
`;

export const contactInfo = (theme: Theme) => css`
  ${theme.fonts.body.normal.M16};

  .info-row {
    display: flex;
    flex-flow: row nowrap;
    gap: 2.2rem;

    margin-bottom: 0.8rem;
  }

  .info-title {
    width: 7.8rem;
    color: ${theme.colors.text03};
  }

  .info-content {
    color: ${theme.colors.text06};

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 0.6rem;
  }
`;

export const warning = (theme: Theme) => css`
  width: fit-content;

  margin-top: 1.6rem;
  padding: 0.4rem 1.2rem;

  border-radius: 1.2rem;

  background-color: ${theme.colors.fieldAlert};
  color: ${theme.colors.textAlert};

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.6rem;
`;

export const closeButton = css`
  cursor: pointer;

  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
`;

export const toastLayout = (theme: Theme) => css`
  color: ${theme.colors.text06};

  height: 5.2rem;

  background-color: ${theme.colors.field01};
  color: ${theme.colors.text06};
  box-shadow: 0 4px 8px rgba(0, 22, 54, 0.2);

  border-radius: 8rem;

  padding: 1.4rem 2.4rem;

  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const toastTitle = (theme: Theme) => css`
  ${theme.fonts.body.normal.SB16};

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 1rem;

  width: max-content;
`;

export const toastViewport = css`
  position: fixed;
  top: 6rem;
  left: 50%;
  transform: translateX(-50%);
`;
