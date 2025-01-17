import { css, Theme } from '@emotion/react';

export const regionField = (theme: Theme) => css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  &[data-state='open'] {
    border: 0.1rem solid ${theme.colors.primaryMint};
  }
`;

export const placeholderText = (theme: Theme, hasValue: boolean) => css`
  ${theme.fonts.label.large.R14};
  color: ${hasValue ? theme.colors.text06 : theme.colors.text02};
`;

export const popoverContent = (theme: Theme) => css`
  width: 45.2rem;
  height: 30.6rem;

  padding: 2.2rem 1.6rem;

  background: ${theme.colors.field01};

  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  box-shadow: 0rem 0.4rem 1rem rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
`;

export const popoverLayout = css`
  display: flex;
  flex-direction: row;
  gap: 2.4rem;

  height: 100%;

  position: relative;
`;

export const regionList = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: scroll;

  width: 11.2rem;

  :after {
    content: '';
    position: absolute;
    top: 50%;
    left: 12.4rem;
    transform: translateY(-50%);
    width: 0.1rem;
    height: 26rem;
    background-color: ${theme.colors.line02};
  }
`;

export const subRegionList = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
`;

export const commonRegionButton = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  height: 3.4rem;

  border-radius: 1.2rem;
  text-align: left;

  &:hover {
    background-color: ${theme.colors.field02};
  }
`;

export const regionButton = (theme: Theme) => css`
  ${commonRegionButton(theme)};

  padding: 0.6rem 1.2rem;
`;

export const subRegionButton = (theme: Theme) => css`
  ${commonRegionButton(theme)};

  padding: 0.6rem 0.8rem;
`;

export const activeRegionButton = (theme: Theme) => css`
  background-color: ${theme.colors.primaryTinted};
  border: 0.1rem solid ${theme.colors.lineTinted};
  color: ${theme.colors.textPrimary};
`;
