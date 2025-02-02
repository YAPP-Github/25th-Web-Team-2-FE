import { css, keyframes, Theme } from '@emotion/react';

export const tooltipContent = (theme: Theme) => css`
  ${theme.fonts.label.medium.M13};
  width: 20rem;
  left: 2.4rem;
  background-color: ${theme.colors.field01};
  border-radius: 0.6rem;
  padding: 0.8rem 1.6rem;
  color: ${theme.colors.text05};
  box-shadow: 0 4px 8px rgba(16, 17, 18, 0.1);
  border: 0.15rem solid ${theme.colors.line01};

  user-select: none;
  animation-duration: 100ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

  &[data-state='delayed-open'][data-side='bottom'] {
    animation-name: ${slideDownAndFade};
  }
`;

export const tooltipArrow = (theme: Theme) => css`
  fill: ${theme.colors.field01};
`;

export const slideDownAndFade = keyframes`
	from {
		opacity: 0;
		transform: translateY(-2px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;
