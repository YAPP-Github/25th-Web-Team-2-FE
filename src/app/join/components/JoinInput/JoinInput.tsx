'use client';

import { useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';

import {
  inputContainer,
  inputResetButton,
  requiredStar,
  errorMessage,
  tipWrapper,
  textCount,
  tipAlert,
  joinInput,
  inputWrapper,
  inputLabel,
  infoContainer,
} from './JoinInput.css';

import Icon from '@/components/Icon';

const formatDateInput = (inputType: string, value: string) => {
  if (inputType !== 'date') return value;

  const numbers = value.replace(/\D/g, '');

  if (numbers.length <= 4) {
    if (numbers.length === 4 && value.includes('.')) return value;

    return numbers;
  }

  if (numbers.length <= 6) {
    if (numbers.length === 6 && value.includes('.')) return value;

    const year = numbers.substring(0, 4);
    const month = numbers.substring(4, 6);
    return `${year}.${month}`;
  }

  const year = numbers.substring(0, 4);
  const month = numbers.substring(4, 6);
  const day = numbers.substring(6, 8);
  return `${year}.${month}.${day}`;
};

interface JoinInputProps<T extends FieldValues> {
  type?: 'input' | 'textarea';
  name: Path<T>;
  control: Control<T>;
  rules?: object;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  tip?: string;
  value?: PathValue<T, Path<T>>;
  maxLength?: number;
  isTip?: boolean;
  isCount?: boolean;
  count?: number;
  inputType?: 'text' | 'date';
}

const JoinInput = <T extends FieldValues>({
  type = 'input',
  name,
  control,
  rules = {},
  placeholder = '',
  label,
  required = false,
  disabled = false,
  tip,
  value,
  maxLength,
  isTip = true,
  isCount = false,
  count,
  inputType = 'text',
}: JoinInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    onBlur: () => void,
  ) => {
    if (resetButtonRef.current && resetButtonRef.current.contains(e.relatedTarget)) {
      return;
    }
    onBlur();
    setIsFocused(false);
  };

  const handleReset = (onChange: (value: string) => void) => {
    onChange('');
    inputRef.current?.focus();
    textareaRef.current?.focus();
  };

  return (
    <div className={inputContainer}>
      {label && (
        <label className={inputLabel}>
          <span>{label}</span>
          {required && <span className={requiredStar}>*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={value}
        render={({ field, fieldState }) => (
          <>
            <div className={inputWrapper}>
              {type === 'input' ? (
                <input
                  {...field}
                  ref={inputRef}
                  placeholder={placeholder}
                  disabled={disabled}
                  maxLength={maxLength}
                  aria-invalid={fieldState.invalid ? true : false}
                  style={{ width: '100%' }}
                  className={joinInput}
                  onChange={(e) => {
                    const formattedValue = formatDateInput(inputType, e.target.value);
                    field.onChange(formattedValue);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={(e) => handleBlur(e, field.onBlur)}
                />
              ) : (
                <textarea
                  {...field}
                  ref={textareaRef}
                  placeholder={placeholder}
                  disabled={disabled}
                  aria-invalid={fieldState.invalid ? true : false}
                  rows={3}
                  maxLength={maxLength}
                  style={{ width: '100%' }}
                  className={joinInput}
                  onFocus={() => setIsFocused(true)}
                  onBlur={(e) => handleBlur(e, field.onBlur)}
                />
              )}
              {isFocused && field.value && !disabled && (
                <button className={inputResetButton} ref={resetButtonRef}>
                  <Icon
                    icon="CloseRound"
                    width={22}
                    height={22}
                    onClick={() => handleReset(field.onChange)}
                    cursor="pointer"
                  />
                </button>
              )}
            </div>
            <div className={infoContainer}>
              {/* 왼쪽: 에러 메시지 또는 헬퍼 텍스트 */}
              <div>
                {fieldState.error ? (
                  <span className={errorMessage}>{fieldState.error.message}</span>
                ) : (
                  tip && (
                    <div className={tipWrapper}>
                      {isTip && <span className={tipAlert}>Tip</span>}
                      <span>{tip}</span>
                    </div>
                  )
                )}
              </div>

              {/* 오른쪽: 카운트 */}
              <div>
                {maxLength && (
                  <span className={textCount}>
                    {field.value?.length || 0}/{maxLength}
                  </span>
                )}
                {isCount && count && (
                  <span className={textCount}>
                    {field.value?.length || 0}/{count}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      />
    </div>
  );
};

export default JoinInput;
