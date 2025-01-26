import * as Popover from '@radix-ui/react-popover';
import { ko } from 'date-fns/locale';
import React, { useState, forwardRef } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { FieldError } from 'react-hook-form';

import 'react-day-picker/dist/style.css';

import {
  datepickerCustom,
  datePickerField,
  datePickerFieldContainer,
  iconStyle,
  placeholderText,
  popoverLayout,
} from './DatePickerForm.styles';
import { formatRange } from '../../upload.utils';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface DatePickerFormProps {
  placeholder: string;
  onDateChange: (dates: { from: string | null; to: string | null }) => void;
  experimentDateChecked?: boolean;
  error?: FieldError;
  field?: {
    onBlur: VoidFunction;
  };
}

const DatePickerForm = forwardRef<HTMLInputElement, DatePickerFormProps>(
  (
    { placeholder, onDateChange, experimentDateChecked = false, error, field }: DatePickerFormProps,
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState<DateRange>({
      from: undefined,
      to: undefined,
    });

    const handleDateChange = (range: DateRange) => {
      const formattedRange = formatRange(range);
      setSelectedDates(range);
      onDateChange(formattedRange);
    };

    return (
      <div
        css={datePickerFieldContainer}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <Popover.Root open={isOpen && !experimentDateChecked} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <div
              css={(theme) => datePickerField(theme, experimentDateChecked, isOpen, !!error)}
              aria-label="실험일시 선택"
              className="date-picker-field"
              ref={ref}
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
                  subcolor={
                    isOpen
                      ? colors.primaryTinted
                      : experimentDateChecked
                      ? colors.field02
                      : colors.field01
                  }
                />
              </span>
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              sideOffset={6}
              css={popoverLayout}
              onFocusOutside={() => {
                field?.onBlur();
                setIsOpen(false);
              }}
              onInteractOutside={() => {
                field?.onBlur();
                setIsOpen(false);
              }}
            >
              <DayPicker
                locale={ko}
                mode="range"
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
                captionLayout="dropdown-months"
                showOutsideDays
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  },
);

DatePickerForm.displayName = 'DatePickerForm';

export default DatePickerForm;
