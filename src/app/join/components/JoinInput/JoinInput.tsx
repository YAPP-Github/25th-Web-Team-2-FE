import { useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';

import {
  errorMessage,
  inputContainer,
  inputResetButton,
  inputWrapper,
  requiredStar,
  textCount,
  tipAlert,
  tipWrapper,
} from './JoinInput.styles';

import Icon from '@/components/Icon';

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
}: JoinInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const resetButtonRef = useRef<HTMLButtonElement | null>(null);

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

  return (
    <div css={inputContainer}>
      {label && (
        <label>
          <span>{label}</span>
          {required && <span css={requiredStar}>*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={value}
        render={({ field, fieldState }) => (
          <>
            <div css={inputWrapper}>
              {type === 'input' ? (
                <input
                  {...field}
                  placeholder={placeholder}
                  disabled={disabled}
                  maxLength={maxLength}
                  aria-invalid={fieldState.invalid ? true : false}
                  style={{ width: '100%' }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={(e) => handleBlur(e, field.onBlur)}
                />
              ) : (
                <textarea
                  {...field}
                  placeholder={placeholder}
                  disabled={disabled}
                  aria-invalid={fieldState.invalid ? true : false}
                  rows={3}
                  maxLength={maxLength ?? 0}
                  style={{ width: '100%' }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={(e) => handleBlur(e, field.onBlur)}
                />
              )}
              {isFocused && field.value && !disabled && (
                <button css={inputResetButton} ref={resetButtonRef}>
                  <Icon
                    icon="CloseRound"
                    width={22}
                    height={22}
                    onClick={() => field.onChange('')}
                    cursor="pointer"
                  />
                </button>
              )}
            </div>
            {fieldState.error && <span css={errorMessage}>{fieldState.error.message}</span>}
            {type === 'textarea' && (
              <span css={textCount}>
                {field.value?.length || 0}/{maxLength}
              </span>
            )}
            {tip && Boolean(!fieldState.error) && (
              <div css={tipWrapper}>
                {isTip && <span css={tipAlert}>Tip</span>}
                <span>{tip}</span>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default JoinInput;
