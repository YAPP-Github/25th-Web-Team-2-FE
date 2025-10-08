'use client';

import { useRef, useState, useEffect } from 'react';
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
import { formatDateInput, getBackspaceAfterDotResult } from './JoinInput.utils';

import Icon from '@/components/Icon';

interface JoinInputProps<T extends FieldValues> {
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
  inputType?: 'text' | 'date';
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputPropRef?:
    | React.MutableRefObject<HTMLInputElement | null>
    | ((el: HTMLInputElement | null) => void);
}

// NOTE: forwardRef 사용하면 제네릭이 원하는대로 정의할 수 없어 inputPropRef로 관리
const JoinInput = <T extends FieldValues>({
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
  inputType = 'text',
  className,
  onKeyDown,
  inputPropRef,
}: JoinInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pendingCursorPosition, setPendingCursorPosition] = useState<number | null>(null);

  // 백스페이스 감지를 위한 이전 상태 추적
  const previousValueRef = useRef('');
  const previousCursorRef = useRef<number | null>(null);

  // 커서를 앞으로 옮겨 지웠을 때 커서 위치 복원을 위한 로직
  useEffect(() => {
    if (pendingCursorPosition !== null && inputRef.current?.setSelectionRange) {
      inputRef.current.setSelectionRange(pendingCursorPosition, pendingCursorPosition);
      setPendingCursorPosition(null);
    }
  }, [pendingCursorPosition]);

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
        rules={rules}
        defaultValue={value}
        render={({ field, fieldState }) => {
          const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            if (resetButtonRef.current && resetButtonRef.current.contains(e.relatedTarget)) {
              return;
            }
            field.onBlur();
            setIsFocused(false);
          };

          const handleReset = () => {
            field.onChange('');
            inputRef.current?.focus();
          };

          const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (inputType === 'date') {
              previousValueRef.current = field.value || '';
              previousCursorRef.current = e.currentTarget.selectionStart;
            }

            onKeyDown?.(e);
          };

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const currentValue = e.target.value;
            const currentCursor = e.target.selectionStart;

            if (inputType === 'date') {
              const backspaceResult = getBackspaceAfterDotResult(
                previousValueRef.current,
                currentValue,
                previousCursorRef.current,
              );

              if (backspaceResult) {
                field.onChange(backspaceResult.newValue);
                setPendingCursorPosition(backspaceResult.newCursor);
                previousValueRef.current = backspaceResult.newValue;
                previousCursorRef.current = backspaceResult.newCursor;
                return;
              }
            }

            // 일반적인 포맷팅 처리
            const { formattedValue, cursorPosition } = formatDateInput(
              inputType,
              currentValue,
              currentCursor,
            );
            field.onChange(formattedValue);

            if (inputType === 'date') {
              setPendingCursorPosition(cursorPosition);
              previousValueRef.current = formattedValue;
              previousCursorRef.current = cursorPosition;
            }
          };

          return (
            <>
              <div className={inputWrapper}>
                <input
                  {...field}
                  id={name}
                  ref={(el) => {
                    field.ref(el);
                    inputRef.current = el;
                    if (typeof inputPropRef === 'function') {
                      inputPropRef(el);
                    } else if (inputPropRef) {
                      inputPropRef.current = el;
                    }
                  }}
                  placeholder={placeholder}
                  disabled={disabled}
                  maxLength={maxLength}
                  aria-invalid={fieldState.invalid ? true : false}
                  style={{ width: '100%' }}
                  className={`${joinInput} ${className ?? ''}`}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleBlur}
                  inputMode={inputType === 'date' ? 'decimal' : 'text'}
                />
                {isFocused && field.value && !disabled && (
                  <button
                    className={inputResetButton}
                    ref={resetButtonRef}
                    onMouseDown={(e) => {
                      e.preventDefault(); // blur 방지
                      handleReset();
                    }}
                  >
                    <Icon icon="CloseRound" width={22} height={22} cursor="pointer" />
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
                </div>
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default JoinInput;
