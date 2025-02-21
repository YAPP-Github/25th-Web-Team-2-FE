import { style } from '@vanilla-extract/css';

export const a11yHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  overflow: 'hidden',
});
