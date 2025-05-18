import { style, keyframes } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const slideDownAndFade = keyframes({
  from: { opacity: 0, transform: 'translateY(-2px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const tooltipContent = style({
  ...fonts.label.medium.M13,
  width: '20rem',
  left: '2.4rem',
  backgroundColor: colors.field01,
  borderRadius: '0.6rem',
  padding: '0.8rem 1.6rem',
  color: colors.text05,
  boxShadow: '0 4px 8px rgba(16, 17, 18, 0.1)',
  border: `0.15rem solid ${colors.line01}`,
  userSelect: 'none',
  animationDuration: '100ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  selectors: {
    '&[data-state="delayed-open"][data-side="bottom"]': {
      animationName: slideDownAndFade,
    },
  },
});
