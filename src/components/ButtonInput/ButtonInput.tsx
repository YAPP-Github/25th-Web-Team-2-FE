import React, { useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import {
  inputContainer,
  inputLabel,
  errorMessage,
  joinInput,
  requiredStar,
  tipWrapper,
  infoContainer,
  inputWrapper,
  confirmButton,
} from './ButtonInput.css';

interface ButtonInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onClick: () => void;
  isLoading: boolean;
  setIsValidToastOpen: (value: boolean) => void;
  toast: React.ReactNode;
  title?: string;
  required?: boolean;
  className?: string;
  tip?: string;
}

const ButtonInput = <T extends FieldValues>({
  control,
  name,
  onClick,
  isLoading,
  toast,
  title,
  required,
  className,
  tip,
}: ButtonInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const validateButtonRef = useRef<HTMLButtonElement>(null);

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    onBlur: () => void,
  ) => {
    if (validateButtonRef.current && validateButtonRef.current.contains(e.relatedTarget)) {
      return;
    }

    onBlur();
    setIsFocused(false);
  };

  return (
    <div className={inputContainer}>
      <label className={inputLabel}>
        {title && <span>{title}</span>}
        {required && <span className={requiredStar}>*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const isButtonDisabled = !field.value || fieldState.invalid;

          return (
            <>
              <div className={inputWrapper}>
                <input
                  {...field}
                  style={{ width: '100%' }}
                  className={className ? className : joinInput}
                  placeholder="이메일 입력"
                  aria-invalid={fieldState.invalid ? true : false}
                  onFocus={() => setIsFocused(true)}
                  onBlur={(e) => handleBlur(e, field.onBlur)}
                />
                {isFocused && field.value && (
                  <button
                    type="button"
                    className={confirmButton}
                    disabled={isButtonDisabled || isLoading}
                    onClick={onClick}
                    onMouseDown={(e) => e.preventDefault()}
                    ref={validateButtonRef}
                  >
                    {isLoading ? '확인 중...' : '중복 확인'}
                  </button>
                )}
              </div>
              <div className={infoContainer}>
                {fieldState.error ? (
                  <span className={errorMessage}>{fieldState.error.message}</span>
                ) : (
                  tip && (
                    <div className={tipWrapper}>
                      <span>{tip}</span>
                    </div>
                  )
                )}
              </div>
            </>
          );
        }}
      />
      {toast}
    </div>
  );
};

export default ButtonInput;
