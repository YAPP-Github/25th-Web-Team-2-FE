import { css, Theme } from '@emotion/react';

export const textInputContainer = (size: 'half' | 'full') => css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;

  width: 100%;
  max-width: ${size === 'half' ? '45.2rem' : '93.6rem'};
`;

export const textCounter = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.text02};

  text-align: right;
`;

export const textSubMessageLayout = (showTextCounter: boolean) => css`
  display: flex;
  flex-flow: ${showTextCounter ? 'row-reverse nowrap' : 'row nowrap'};
  justify-content: space-between;
  align-items: center;
`;

export const formMessage = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.textAlert};
  margin: 0;
`;

export const textInput = (theme: Theme, status: string) => css`
  ${theme.fonts.label.large.R14};

  width: 100%;
  height: 4.8rem;
  padding: 0.8rem 1.2rem;
  border: 0.1rem solid ${status === 'error' ? theme.colors.textAlert : theme.colors.line01};
  border-radius: 1.2rem;
  color: ${theme.colors.text06};

  &:focus {
    border-color: ${status === 'error' ? theme.colors.textAlert : theme.colors.lineTinted};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.text02};
    ${theme.fonts.label.large.R14};
  }
`;
