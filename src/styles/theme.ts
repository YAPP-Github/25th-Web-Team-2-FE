import { colors } from './colors';
import { fonts } from './fonts';

const theme: {
  colors: typeof colors;
  fonts: typeof fonts;
} = {
  colors,
  fonts,
} as const;

export type ThemeType = typeof theme;

export default theme;
