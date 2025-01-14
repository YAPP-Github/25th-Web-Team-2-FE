import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { css, Theme } from '@emotion/react';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

export type NullableDate = Date | null;

interface DatePickerFieldProps {
  placeholder: string;
  onDateChange: (dates: { startDate: NullableDate; endDate: NullableDate }) => void;
  experimentDateChecked?: boolean;
}

const DatePickerField = ({
  placeholder,
  onDateChange,
  experimentDateChecked = false,
}: DatePickerFieldProps) => {
  const [startDate, setStartDate] = useState<NullableDate>(null);
  const [endDate, setEndDate] = useState<NullableDate>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && experimentDateChecked) {
      setIsOpen(false);
    }
  }, [isOpen, setIsOpen, experimentDateChecked]);

  const handleDateChange = (dates: [NullableDate, NullableDate]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);

    onDateChange({ startDate: start, endDate: end });

    if (start && end) {
      setIsOpen(false);
    }
  };

  return (
    <div css={datePickerWrapper}>
      <div
        css={(theme) => styledDiv(theme, experimentDateChecked, isOpen)}
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
      >
        <span css={(theme) => placeholderText(theme, startDate !== null && endDate !== null)}>
          {!experimentDateChecked
            ? startDate && endDate
              ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
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
      {isOpen && (
        <div css={popupWrapper}>
          <ReactDatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            minDate={new Date()}
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 5))}
          />
        </div>
      )}
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

const placeholderText = (theme: Theme, bothDatesSelected: boolean) => css`
  ${theme.fonts.label.large.R14};
  color: ${bothDatesSelected ? theme.colors.text06 : theme.colors.text02};

  flex: 1;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const iconStyle = css`
  margin-left: 1rem;
`;

const popupWrapper = (theme: Theme) => css`
  position: absolute;
  top: 100%;
  z-index: ${theme.zIndex.datePickerPopup};
  background-color: ${colors.field01};
  border: 0.1rem solid ${colors.line01};
  border-radius: 8px;
`;
