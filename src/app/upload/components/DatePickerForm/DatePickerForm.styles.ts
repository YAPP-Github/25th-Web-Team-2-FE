import { css, Theme } from '@emotion/react';

export const datePickerFieldContainer = (theme: Theme) => css`
  position: relative;
  outline: none;

  :focus {
    outline: none;
    outline: 0.1rem solid ${theme.colors.primaryMint};
    border-radius: 1.2em;

    .date-picker-field {
      border: none;
    }
  }
`;

export const datePickerField = (
  theme: Theme,
  experimentDateChecked: boolean,
  isOpen: boolean,
  isError: boolean,
) => css`
  width: 100%;
  height: 4.8rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.3rem 1.6rem;

  border: 0.1rem solid
    ${isError
      ? theme.colors.textAlert
      : experimentDateChecked
      ? theme.colors.line01
      : isOpen
      ? theme.colors.lineTinted
      : theme.colors.line01};

  border-radius: 1.2rem;

  background-color: ${experimentDateChecked ? theme.colors.field02 : theme.colors.field01};

  cursor: ${experimentDateChecked ? 'not-allowed' : 'pointer'};
`;

export const placeholderText = (
  theme: Theme,
  bothDatesSelected: boolean,
  experimentDateChecked: boolean,
) => css`
  ${theme.fonts.label.large.R14};
  color: ${experimentDateChecked
    ? theme.colors.text02
    : bothDatesSelected
    ? theme.colors.text06
    : theme.colors.text02};

  flex: 1;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const iconStyle = css`
  margin-left: 1rem;
`;

export const popoverLayout = (theme: Theme) => css`
  background-color: ${theme.colors.field01};
  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 8px;
  padding: 1rem;
  z-index: ${theme.zIndex.datePickerPopup};

  width: 45.2rem;

  box-shadow: 0rem 0.4rem 1rem rgba(0, 0, 0, 0.1);
`;

export const datepickerCustom = (theme: Theme) => css`
  .rdp-months {
    width: 40rem;
    position: relative;
    padding-top: 1.2rem;
  }

  .rdp-month {
    display: flex;
    flex-flow: column nowrap;
  }

  .rdp-nav {
    position: absolute;
    top: 1.2rem;
    right: 50%;
    transform: translate(50%);

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    gap: 24.8rem;
  }

  .rdp-chevron {
    fill: ${theme.colors.icon03};
  }

  .rdp-month_caption {
    display: flex;
    flex-flow: row-reverse nowrap;
    justify-content: center;
  }

  .rdp-dropdowns {
    margin-top: 2.4rem 3rem 0 3rem;
    width: 21.6rem;

    display: flex;
    flex-flow: row-reverse nowrap;
  }

  .rdp-dropdown:focus {
    outline: none;
    border: none;
  }

  .rdp-years_dropdown {
    width: 11.4rem;
  }

  .rdp-months_dropdown {
    width: 9.4rem;
    cursor: not-allowed;
    pointer-events: none;
  }

  .rdp-caption_label {
    width: 9.4rem;
  }
  .rdp-caption_label .rdp-chevron {
    visibility: hidden;
  }

  .rdp-dropdowns span[role='status']::after {
    content: '년';
  }

  .rdp-month_grid {
    border-collapse: separate !important;

    border-spacing: 0 1.2rem;
    margin-top: 0.8rem;

    width: 43rem;
    padding: 0 1.6rem;
  }

  .rdp-weekdays {
    color: ${theme.colors.text03};
    height: 3.2rem;

    background-color: ${theme.colors.field02};
    border-radius: 1.2rem;

    th {
      ${theme.fonts.label.medium.M13};
    }

    th:first-of-type {
      border-top-left-radius: 1.2rem;
      border-bottom-left-radius: 1.2rem;
    }

    th:last-of-type {
      border-top-right-radius: 1.2rem;
      border-bottom-right-radius: 1.2rem;
    }
  }

  .rdp-day_button {
    width: 4rem;
    height: 4rem;

    border-radius: 1.2rem;
    border: none;

    margin: 0 auto;
  }

  .rdp-selected .rdp-range_middle {
    width: 4rem;
    height: 4rem;
  }

  .rdp-today .rdp-day_button {
    color: ${theme.colors.text06};

    width: 4rem;
    height: 4rem;

    border-radius: 1.2rem;
    border: none;

    background-color: ${theme.colors.field02};
  }

  .rdp-range_start .rdp-day_button {
    background-color: ${theme.colors.primaryMint};
    color: ${theme.colors.text01};
  }

  .rdp-day_button {
    ${theme.fonts.body.normal.M16};
  }
  .rdp-selected {
    ${theme.fonts.body.normal.M16};
  }
`;
