import { css, Theme } from '@emotion/react';

export const checkboxLayout = (
  theme: Theme,
  align: 'left' | 'center' | 'right',
  size: 'small' | 'large',
  boldStyle: boolean,
) => css`
  ${size === 'small' ? theme.fonts.label.small.M12 : theme.fonts.label.large.R14};

  font-weight: ${boldStyle || size === 'small' ? '500' : '400'};

  color: ${boldStyle ? theme.colors.text06 : theme.colors.text04};

  margin-top: 0.4rem;

  display: flex;
  justify-content: ${align};

  cursor: pointer;

  label {
    cursor: pointer;
  }
`;

export const checkboxContainer = (size: 'small' | 'large') => css`
  width: fit-content;

  display: flex;
  flex-flow: row nowrap;
  gap: ${size === 'small' ? '0.2rem' : '0.4rem'};
  align-items: center;
`;
