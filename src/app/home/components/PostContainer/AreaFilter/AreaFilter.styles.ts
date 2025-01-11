import { css, Theme } from '@emotion/react';

export const triggerWrapper = (theme: Theme) => css`
  ${theme.fonts.label.large.SB14};
  color: ${theme.colors.text06};
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.4rem;
  border-radius: 1.2rem;
  background-color: ${theme.colors.field01};

  &:hover {
    box-shadow: 0px 4px 16px rgb(53, 59, 61, 0.2);
  }
`;

export const regionContentContainer = (theme: Theme) => css`
  background-color: ${theme.colors.field01};
  position: relative;
  top: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 36.4rem;
  height: 35rem;
  padding: 1.2rem;
  border-radius: 1.2rem;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

export const contentWrapper = (theme: Theme) => css`
  background-color: ${theme.colors.field02};
  border-radius: 1.2rem;
  display: flex;
`;

export const areaListContainer = (theme: Theme) => css`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.2rem 0.8rem;
  background-color: ${theme.colors.field02};
  border-radius: 1.2rem;

  height: 28rem;
  overflow: scroll;
`;

export const areaName = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text06};
`;

export const selectedAreaName = (theme: Theme) => css`
  color: ${theme.colors.textPrimary};
`;

export const areaCount = (theme: Theme) => css`
  ${theme.fonts.label.medium.R13};
  color: ${theme.colors.text03};
`;

export const areaButton = (theme: Theme) => css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 1.2rem;

  &:hover {
    background-color: ${theme.colors.field03};
  }
`;

export const selectedAreaButton = (theme: Theme) => css`
  background-color: ${theme.colors.primaryTinted};
  outline: 0.1rem solid ${theme.colors.lineTinted};
  font-weight: bold;
`;

export const verticalLine = (theme: Theme) => css`
  position: relative;

  ::after {
    content: '';
    width: 0.1rem;
    height: 100%;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: ${theme.colors.line01};
  }

  :last-child::after {
    display: none;
  }
`;

export const subAreaListContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  height: 28rem;
  overflow: scroll;
  padding: 1.2rem 0.8rem;
  border-radius: 1.2rem;
`;

export const subAreaItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  height: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 1.2rem;
`;

export const selectedSubAreaLabel = (theme: Theme) => css`
  outline: 0.1rem solid ${theme.colors.lineTinted};
  background-color: ${theme.colors.primaryTinted};
`;

export const checkbox = css`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const subAreaInfo = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

export const placeholderArea = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};
  color: ${theme.colors.text03};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const footerContainer = css`
  display: flex;
  justify-content: flex-end;
`;

export const footerButtonContainer = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export const resetButton = (theme: Theme) => css`
  ${theme.fonts.label.large.SB14};
  background-color: ${theme.colors.field03};
  color: ${theme.colors.text06};
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 1.2rem;
`;

export const saveButton = (theme: Theme) => css`
  ${theme.fonts.label.large.SB14};
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 1.2rem;
`;
