import { css, Theme } from '@emotion/react';

export const genderSelectWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ageSelectWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const popoverTrigger = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  width: fit-content;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 1.2rem;

  &:hover {
    box-shadow: 0px 4px 16px 0px rgba(53, 59, 61, 0.08);
  }
`;

export const popoverContent = css`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  gap: 1.6rem;
  margin-top: 0.6rem;
`;

export const labelWrapper = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

export const label = (theme: Theme) => css`
  ${theme.fonts.body.normal.M16};
  color: ${theme.colors.text06};
`;

export const subLabel = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};
  color: ${theme.colors.text03};
`;

export const buttonGroup = (theme: Theme) => css`
  display: flex;
  gap: 0.8rem;

  button {
    ${theme.fonts.label.large.M14};
    color: ${theme.colors.text06};
    padding: 0.6rem 2.15rem;
    border-radius: 1.2rem;
    outline: 1px solid ${theme.colors.line01};
    transition: color 0.1s, background-color 0.1s, outline 0.1s;
  }

  button.active {
    background-color: ${theme.colors.primaryTinted};
    outline: 1px solid ${theme.colors.lineTinted};
    color: ${theme.colors.textPrimary};
  }
`;

export const ageInputContainer = (theme: Theme) => css`
  display: flex;
  gap: 1rem;
  align-items: center;

  input {
    ${theme.fonts.label.large.M14};
    width: 100%;
    padding: 0.6rem 0;
    border: 1px solid ${theme.colors.line01};
    border-radius: 1.2rem;
    text-align: center;
  }
`;

export const ageButtonWrapper = css`
  display: flex;
  gap: 0.4rem;
`;

export const footerButtonContainer = (theme: Theme) => css`
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;

  button {
    ${theme.fonts.label.large.SB14};
    padding: 0.6rem 1.4rem;
    border-radius: 1.2rem;
  }
`;

export const resetButton = (theme: Theme) => css`
  background-color: ${theme.colors.field03};
  color: ${theme.colors.text06};
`;

export const saveButton = (theme: Theme) => css`
  background-color: ${theme.colors.primaryMint};
  color: ${theme.colors.text01};
`;
