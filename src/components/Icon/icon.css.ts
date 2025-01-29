import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const iconContainer = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s',
  },
  variants: {
    rotate: {
      0: { transform: 'rotate(0deg)' },
      90: { transform: 'rotate(90deg)' },
      180: { transform: 'rotate(180deg)' },
      270: { transform: 'rotate(270deg)' },
    },
    cursor: {
      default: { cursor: 'default' },
      pointer: { cursor: 'pointer' },
      initial: { cursor: 'initial' },
      notAllowed: { cursor: 'not-allowed' },
    },
  },
  defaultVariants: {
    rotate: 0,
    cursor: 'initial',
  },
});

export const dynamicVars = {
  width: '--icon-width',
  height: '--icon-height',
};

export const iconDynamicStyle = style({
  vars: {
    [dynamicVars.width]: '24px',
    [dynamicVars.height]: '24px',
  },
  width: `var(${dynamicVars.width})`,
  height: `var(${dynamicVars.height})`,
});
