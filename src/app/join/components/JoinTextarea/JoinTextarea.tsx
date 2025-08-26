'use client';

import { useRef } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';

import {
  inputContainer,
  requiredStar,
  errorMessage,
  textCount,
  joinInput,
  inputWrapper,
  inputLabel,
  infoContainer,
} from './JoinTextarea.css';

interface JoinTextareaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  value?: PathValue<T, Path<T>>;
  maxLength?: number;
  rows?: number;
}

const JoinTextarea = <T extends FieldValues>({
  name,
  control,
  placeholder = '',
  label,
  required = false,
  disabled = false,
  value,
  maxLength,
  rows = 3,
}: JoinTextareaProps<T>) => {
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>, onBlur: () => void) => {
    if (resetButtonRef.current && resetButtonRef.current.contains(e.relatedTarget)) {
      return;
    }
    onBlur();
  };

  return (
    <div className={inputContainer}>
      {label && (
        <label className={inputLabel} htmlFor={name}>
          <span>{label}</span>
          {required && <span className={requiredStar}>*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={({ field, fieldState }) => (
          <>
            <div className={inputWrapper}>
              <textarea
                {...field}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                aria-invalid={fieldState.invalid ? true : false}
                rows={rows}
                maxLength={maxLength}
                style={{ width: '100%' }}
                className={joinInput}
                onBlur={(e) => handleBlur(e, field.onBlur)}
              />
            </div>
            <div className={infoContainer}>
              {/* 왼쪽: 에러 메시지 또는 헬퍼 텍스트 */}
              <div>
                {fieldState.error && (
                  <span className={errorMessage}>{fieldState.error.message}</span>
                )}
              </div>

              {/* 오른쪽: 카운트 */}
              <div>
                {maxLength && (
                  <span className={textCount}>
                    {field.value?.length || 0}/{maxLength}
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

export default JoinTextarea;
