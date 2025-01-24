import { css, Theme } from '@emotion/react';

export const applyMethodContainer = css`
  margin-top: 2rem;
  margin-bottom: 4.8rem;
`;

export const applyMethodContentLayout = css`
  display: flex;
  flex-flow: column nowrap;
`;

export const addContactInfoContainer = css`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.8rem;
`;

export const targetConditionLayout = css`
  display: flex;
  flex-flow: column nowrap;
  gap: 2.8rem;
`;

export const targetGroupContainer = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export const ageInputContainer = (theme: Theme, isError: boolean) => css`
  width: 45.2rem;
  height: 4.8rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1rem solid ${isError ? theme.colors.textAlert : theme.colors.line01};
  border-radius: 1.2rem;
  padding: 1.3rem 1.6rem;
`;

export const textStyle = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};
  color: ${theme.colors.text06};
`;

export const alarmAgreeContainer = (theme: Theme) => css`
  width: fit-content;
  height: 3.4rem;

  padding: 0 1rem;

  background-color: ${theme.colors.field02};
  border-radius: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;
