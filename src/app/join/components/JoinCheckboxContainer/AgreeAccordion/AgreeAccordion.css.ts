import { style } from '@vanilla-extract/css';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

// Accordion.Trigger 스타일
export const accordionTrigger = style({
  ...fonts.body.normal.M16,
  color: colors.text06,

  width: '100%',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  cursor: 'pointer',
});

// 화살표 아이콘 스타일 (open 상태에서 회전)
export const chevronStyle = style({
  transition: 'transform 0.2s ease',
  selectors: {
    '&[data-state="open"]': {
      transform: 'rotate(180deg)',
    },
  },
});

// Accordion.Content 스타일
export const accordionContent = style({
  ...fonts.body.normal.M16,
  color: colors.text06,
  padding: '0.8rem 0',
  // 필요한 스타일 지정
  // 예: backgroundColor: colors.field01,
});
