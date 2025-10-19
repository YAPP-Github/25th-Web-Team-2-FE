import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts.css';

export const datePickerFieldContainer = style({
  position: 'relative',
  outline: 'none',

  ':focus': {
    outline: `0.1rem solid ${colors.primaryMint}`,
    borderRadius: '1.2rem',
  },
});

export const datePickerField = recipe({
  base: {
    width: '100%',
    maxWidth: ' 45.2rem',
    height: '4.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.3rem 1.6rem',
    borderRadius: '1.2rem',
    cursor: 'pointer',
  },
  variants: {
    experimentDateChecked: {
      true: {
        backgroundColor: colors.field02,
        border: `0.1rem solid ${colors.line01}`,
        cursor: 'not-allowed',
      },
      false: {
        backgroundColor: colors.field01,
      },
    },
    isOpen: {
      true: {
        border: `0.1rem solid ${colors.lineTinted}`,
      },
      false: {
        border: `0.1rem solid ${colors.line01}`,
      },
    },
    isError: {
      true: {
        border: `0.1rem solid ${colors.textAlert}`,
      },
    },
  },
});

export const placeholderText = recipe({
  base: {
    ...fonts.label.large.R14,
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  variants: {
    experimentDateChecked: {
      true: {
        color: colors.text02, // 본문 참고일 때 원래 의도한 색
      },
      false: {},
    },
    bothDatesSelected: {
      true: {
        color: colors.text06, // 날짜가 선택되면 text06 (더 어두운) 적용
      },
      false: {
        color: colors.text02,
      },
    },
  },
});

export const iconStyle = style({
  marginLeft: '1rem',
});

export const popoverLayout = style({
  backgroundColor: colors.field01,
  border: `0.1rem solid ${colors.line01}`,
  borderRadius: '8px',
  padding: '1rem',
  zIndex: '10',
  width: '45.2rem',
  boxShadow: '0rem 0.4rem 1rem rgba(0, 0, 0, 0.1)',
});

export const datepickerCustomClass = style({});

globalStyle(`.${datepickerCustomClass} .rdp-months`, {
  position: 'relative',
  paddingTop: '1.2rem',
});

globalStyle(`.${datepickerCustomClass} .rdp-month`, {
  display: 'flex',
  flexFlow: 'column nowrap',
});

globalStyle(`.${datepickerCustomClass} .rdp-nav`, {
  position: 'absolute',
  top: '1.2rem',
  right: '50%',
  transform: 'translate(50%)',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  gap: '24.8rem',
});

globalStyle(`.${datepickerCustomClass} .rdp-chevron`, {
  fill: colors.icon03,
});

globalStyle(`.${datepickerCustomClass} .rdp-month_caption`, {
  display: 'flex',
  flexFlow: 'row-reverse nowrap',
  justifyContent: 'center',
});

globalStyle(`.${datepickerCustomClass} .rdp-dropdowns`, {
  width: '21.6rem',
  display: 'flex',
  flexFlow: 'row-reverse nowrap',
});

globalStyle(`.${datepickerCustomClass} .rdp-dropdown:focus`, {
  outline: 'none',
  border: 'none',
});

globalStyle(`.${datepickerCustomClass} .rdp-years_dropdown`, {
  width: '11.4rem',
});

globalStyle(`.${datepickerCustomClass} .rdp-months_dropdown`, {
  width: '9.4rem',
  cursor: 'not-allowed',
  pointerEvents: 'none',
});

globalStyle(`.${datepickerCustomClass} .rdp-caption_label`, {
  width: '9.4rem',
});

globalStyle(`.${datepickerCustomClass} .rdp-caption_label .rdp-chevron`, {
  visibility: 'hidden',
});

globalStyle(`.${datepickerCustomClass} .rdp-dropdowns span[role='status']::after`, {
  content: "'년'",
});

globalStyle(`.${datepickerCustomClass} .rdp-month_grid`, {
  borderCollapse: 'separate',
  borderSpacing: '0 1.2rem',
  marginTop: '0.8rem',
  width: '43rem',
  padding: '0 1.6rem',
});

globalStyle(`.${datepickerCustomClass} .rdp-weekdays`, {
  color: colors.text03,
  height: '3.2rem',
  backgroundColor: colors.field02,
  borderRadius: '1.2rem',
});

globalStyle(`.${datepickerCustomClass} .rdp-weekdays th`, {
  ...fonts.label.medium.M13,
  verticalAlign: 'middle',
});

globalStyle(`.${datepickerCustomClass} .rdp-weekdays th:first-of-type`, {
  borderTopLeftRadius: '1.2rem',
  borderBottomLeftRadius: '1.2rem',
});

globalStyle(`.${datepickerCustomClass} .rdp-weekdays th:last-of-type`, {
  borderTopRightRadius: '1.2rem',
  borderBottomRightRadius: '1.2rem',
});

globalStyle(`.${datepickerCustomClass} .rdp-day_button`, {
  width: '4rem',
  height: '4rem',
  borderRadius: '1.2rem',
  border: 'none',
  margin: '0 auto',
  ...fonts.body.normal.M16,
});

globalStyle(`.${datepickerCustomClass} .rdp-selected .rdp-range_middle`, {
  width: '4rem',
  height: '4rem',
});

globalStyle(`.${datepickerCustomClass} .rdp-range_middle`, {
  width: '4rem',
  height: '4rem',
  backgroundColor: colors.primaryTinted,
});

globalStyle(`.${datepickerCustomClass} .rdp-today .rdp-day_button`, {
  color: colors.text06,
  width: '4rem',
  height: '4rem',
  borderRadius: '1.2rem',
  border: 'none',
  backgroundColor: colors.field02,
});

globalStyle(`.${datepickerCustomClass} .rdp-range_start .rdp-day_button`, {
  backgroundColor: colors.primaryMint,
  color: colors.text01,
});
globalStyle(`.${datepickerCustomClass} .rdp-range_end .rdp-day_button`, {
  backgroundColor: colors.primaryMint,
  color: colors.text01,
});

globalStyle(`.${datepickerCustomClass} .rdp-selected`, {
  ...fonts.body.normal.M16,
});

globalStyle(
  `.${datepickerCustomClass} .rdp-day.single-day-selected,
  .${datepickerCustomClass} .rdp-day.start-day-selected,
  .${datepickerCustomClass} .rdp-day.end-day-selected`,
  {
    position: 'relative',
  },
);

globalStyle(
  `.${datepickerCustomClass} .rdp-day.single-day-selected::after,
  .${datepickerCustomClass} .rdp-day.start-day-selected::after,
  .${datepickerCustomClass} .rdp-day.end-day-selected::after`,
  {
    ...fonts.label.small.M12,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '1.2rem',
    color: colors.textPrimary,
    whiteSpace: 'nowrap',
  },
);

globalStyle(`.${datepickerCustomClass} .rdp-day.single-day-selected::after`, {
  content: '"하루 진행"',
});

globalStyle(`.${datepickerCustomClass} .rdp-day.start-day-selected::after`, {
  content: '"시작일"',
});

globalStyle(`.${datepickerCustomClass} .rdp-day.end-day-selected::after`, {
  content: '"종료일"',
});
