import { css, Theme } from '@emotion/react';
import * as Popover from '@radix-ui/react-popover';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface DatePickerFieldProps {
  placeholder: string;
  onDateChange: (dates: DateRange) => void;
  experimentDateChecked?: boolean;
}

export type NullableDate = Date | null;

const DatePickerField = ({
  placeholder,
  onDateChange,
  experimentDateChecked = false,
}: DatePickerFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedDates, setSelectedDates] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleDateChange = (range: DateRange) => {
    setSelectedDates(range);
    onDateChange(range);
  };

  return (
    <div css={datePickerWrapper}>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <div
            css={(theme) => styledDiv(theme, experimentDateChecked, isOpen)}
            role="button"
            tabIndex={0}
          >
            <span
              css={(theme) => placeholderText(theme, !!selectedDates.from, experimentDateChecked)}
            >
              {!experimentDateChecked
                ? selectedDates.from
                  ? selectedDates.from?.toLocaleDateString() ===
                    selectedDates.to?.toLocaleDateString()
                    ? `${selectedDates.from?.toLocaleDateString()}`
                    : `${selectedDates.from?.toLocaleDateString()} ~ ${selectedDates.to?.toLocaleDateString()}`
                  : placeholder
                : '본문 참고'}
            </span>
            <span css={iconStyle}>
              <Icon
                icon="Calendar"
                width={20}
                height={20}
                color={isOpen && !experimentDateChecked ? colors.primaryMint : colors.icon03}
              />
            </span>
          </div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content sideOffset={5} css={popupWrapper}>
            <DayPicker
              locale={ko}
              mode="range"
              captionLayout="dropdown"
              selected={{
                from: selectedDates.from || undefined,
                to: selectedDates.to || undefined,
              }}
              onSelect={handleDateChange}
              disabled={{ before: new Date() }}
              startMonth={new Date(new Date().getFullYear(), 0)}
              endMonth={new Date(new Date().getFullYear() + 5, 11)}
              required
              css={datepickerCustom}
            />
            <Popover.Arrow css={popoverArrow} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default DatePickerField;

const datePickerWrapper = css`
  position: relative;
`;

const styledDiv = (theme: Theme, experimentDateChecked: boolean, isOpen: boolean) => css`
  width: 100%;
  height: 4.8rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1.3rem 1.6rem;

  border: 0.1rem solid
    ${experimentDateChecked
      ? theme.colors.line01
      : isOpen
      ? theme.colors.lineTinted
      : colors.line01};
  border-radius: 1.2rem;

  background-color: ${experimentDateChecked ? theme.colors.field02 : colors.field01};

  cursor: ${experimentDateChecked ? 'default' : 'pointer'};
`;

const placeholderText = (
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

const iconStyle = css`
  margin-left: 1rem;
`;

const popupWrapper = css`
  background-color: ${colors.field01};
  border: 0.1rem solid ${colors.line01};
  border-radius: 8px;
  padding: 1rem;
  z-index: 10;

  width: 45.2rem;
`;

const popoverArrow = css`
  fill: ${colors.field01};
`;

const datepickerCustom = (theme: Theme) => css`
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
  }

  .rdp-caption_label {
    width: 9.4rem;
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

  .rdp-day_button {
    ${theme.fonts.body.normal.M16};
  }
  .rdp-selected {
    ${theme.fonts.body.normal.M16};
  }
`;
