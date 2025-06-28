import { colors } from '@/styles/colors';

export const TOAST_CONFIG_MAP = {
  success: {
    icon: 'CheckRound',
    color: colors.primaryMint,
    subcolor: '',
  },
  error: {
    icon: 'BangRound',
    color: colors.textAlert,
    subcolor: colors.field01,
  },
} as const;
