import * as Popover from '@radix-ui/react-popover';
import { ko } from 'date-fns/locale';
import React, { useState, forwardRef, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { FieldError } from 'react-hook-form';

import 'react-day-picker/dist/style.css';

import {
  datePickerFieldContainer,
  datePickerField,
  placeholderText,
  iconStyle,
  popoverLayout,
  datepickerCustomClass,
} from './DatePickerForm.css';
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
  initialDates?: { from: Date | undefined; to: Date | undefined };
  disabled?: boolean;
}

const MAX_DATE_SELECTIONS = 2;

const DatePickerForm = forwardRef<HTMLInputElement, DatePickerFormProps>(
  (
    {
      placeholder,
      onDateChange,
      experimentDateChecked = false,
      error,
      field,
      initialDates,
      disabled = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState<DateRange>({
      from: undefined,
      to: undefined,
    });
    const [clickCount, setClickCount] = useState<number>(0);

    useEffect(() => {
      if (initialDates?.from || initialDates?.to) {
        setSelectedDates({
          from: initialDates.from,
          to: initialDates.to,
        });
      }
    }, [initialDates]);

    useEffect(() => {
      if (experimentDateChecked) {
        setSelectedDates({ from: undefined, to: undefined });
      }
    }, [experimentDateChecked]);

    const handleOpenChange = (open: boolean) => {
      if (!open) {
        setClickCount(0);
      }
      if (experimentDateChecked || disabled) {
        setIsOpen(false);
        return;
      }
      setTimeout(() => {
        setIsOpen(open);
      }, 0);
    };

    const handleDateChange = (range: DateRange) => {
      const formattedRange = formatRange(range);
      setSelectedDates(range);
      onDateChange(formattedRange);

      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);
      if (newClickCount >= MAX_DATE_SELECTIONS) {
        setIsOpen(false);
        setClickCount(0);
      }
    };

    return (
      <div className={datePickerFieldContainer}>
        <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
          <Popover.Trigger asChild>
            <div
              role="button"
              tabIndex={0}
              className={datePickerField({
                experimentDateChecked: experimentDateChecked || disabled,
                isOpen,
                isError: !!error,
              })}
              aria-label="실험일시 선택"
              ref={ref}
            >
              <span
                className={placeholderText({
                  bothDatesSelected: !experimentDateChecked && !!selectedDates.from && !disabled,
                  experimentDateChecked: experimentDateChecked,
                })}
              >
                {experimentDateChecked
                  ? '본문 참고'
                  : selectedDates.from
                  ? selectedDates.from.toLocaleDateString() ===
                    selectedDates.to?.toLocaleDateString()
                    ? selectedDates.from.toLocaleDateString()
                    : `${selectedDates.from.toLocaleDateString()} ~ ${selectedDates.to?.toLocaleDateString()}`
                  : placeholder}
              </span>
              <span className={iconStyle}>
                <Icon
                  icon="Calendar"
                  width={20}
                  height={20}
                  cursor="pointer"
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
              className={popoverLayout}
              onFocusOutside={() => {
                field?.onBlur();
                handleOpenChange(false);
              }}
              onInteractOutside={() => {
                field?.onBlur();
                handleOpenChange(false);
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
                className={datepickerCustomClass}
                captionLayout="dropdown-months"
                showOutsideDays
                modifiers={{
                  singleDay:
                    selectedDates.from &&
                    selectedDates.to &&
                    selectedDates.from.getTime() === selectedDates.to.getTime()
                      ? [selectedDates.from]
                      : [],
                  startDay:
                    selectedDates.from &&
                    selectedDates.to &&
                    selectedDates.from.getTime() !== selectedDates.to.getTime()
                      ? [selectedDates.from]
                      : [],
                  endDay:
                    selectedDates.from &&
                    selectedDates.to &&
                    selectedDates.from.getTime() !== selectedDates.to.getTime()
                      ? [selectedDates.to]
                      : [],
                }}
                modifiersClassNames={{
                  singleDay: 'single-day-selected',
                  startDay: 'start-day-selected',
                  endDay: 'end-day-selected',
                }}
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
