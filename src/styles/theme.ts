import { colors } from './colors';
import { fonts } from './fonts';
import { zIndex } from './zIndex';

const theme: {
  colors: typeof colors;
  fonts: typeof fonts;
  zIndex: typeof zIndex;
} = {
  colors,
  fonts,
  zIndex,
} as const;

export type ThemeType = typeof theme;

export default theme;
