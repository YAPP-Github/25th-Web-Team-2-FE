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
} from './ButtonInput.css';
import {
  univAuthButton,
  univInputWrapper,
} from '@/app/join/components/Researcher/JoinEmailStep/UnivAuthInput/UnivAuthInput.css';

interface ButtonInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onClick: () => void;
  isLoadingCheck: boolean;
  isSuccess: boolean;
  isEmailDuplicateError: boolean;
  setIsValidToastOpen: (value: boolean) => void;
  toast: React.ReactNode;
  tip?: string;
}

const ButtonInput = <T extends FieldValues>({
  control,
  name,
  onClick,
  isLoadingCheck,
  isSuccess,
  toast,
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
        <span>연락 받을 이메일</span>
        <span className={requiredStar}>*</span>
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const isButtonDisabled = !field.value || fieldState.invalid;

          return (
            <>
              <div className={univInputWrapper}>
                <input
                  {...field}
                  style={{ width: '100%' }}
                  className={joinInput}
                  placeholder="이메일 입력"
                  aria-invalid={fieldState.invalid ? true : false}
                  onFocus={() => setIsFocused(true)}
                  onBlur={(e) => handleBlur(e, field.onBlur)}
                />
                {isFocused && field.value && (
                  <button
                    type="button"
                    className={univAuthButton}
                    disabled={isButtonDisabled || isLoadingCheck || isSuccess}
                    onClick={onClick}
                    ref={validateButtonRef}
                  >
                    {isLoadingCheck ? '확인 중...' : '중복 확인'}
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
