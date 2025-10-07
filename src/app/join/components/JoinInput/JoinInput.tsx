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

import Icon from '@/components/Icon';

const formatDateInput = (
  inputType: string,
  value: string,
  selectionStart: number | null = null,
) => {
  if (inputType !== 'date') {
    return { formattedValue: value, cursorPosition: selectionStart ?? value.length };
  }

  // 숫자만 추출
  const numbers = value.replace(/\D/g, '');

  // 최대 8자리까지만 허용 (YYYYMMDD)
  const limitedNumbers = numbers.slice(0, 8);

  let formattedValue = '';
  let cursorPosition = selectionStart ?? value.length;

  // 포맷팅 적용
  if (limitedNumbers.length <= 4) {
    // YYYY
    formattedValue = limitedNumbers;
  } else if (limitedNumbers.length <= 6) {
    // YYYY.MM
    const year = limitedNumbers.slice(0, 4);
    const month = limitedNumbers.slice(4);
    formattedValue = `${year}.${month}`;
  } else {
    // YYYY.MM.DD
    const year = limitedNumbers.slice(0, 4);
    const month = limitedNumbers.slice(4, 6);
    const day = limitedNumbers.slice(6);
    formattedValue = `${year}.${month}.${day}`;
  }

  // 커서 위치 계산
  if (selectionStart !== null) {
    // 현재 커서 위치까지의 숫자 개수 계산
    const numbersBeforeCursor = value.slice(0, selectionStart).replace(/\D/g, '').length;

    // 새로운 포맷된 값에서 해당 숫자 위치 찾기
    let newCursorPosition = 0;
    let numberCount = 0;

    for (let i = 0; i < formattedValue.length; i++) {
      if (/\d/.test(formattedValue[i])) {
        numberCount++;
        if (numberCount === numbersBeforeCursor) {
          newCursorPosition = i + 1;
          break;
        }
      }
      if (numberCount < numbersBeforeCursor) {
        newCursorPosition = i + 1;
      }
    }

    // 만약 모든 숫자를 다 센 경우, 마지막 위치로
    if (numberCount < numbersBeforeCursor) {
      newCursorPosition = formattedValue.length;
    }

    cursorPosition = newCursorPosition;
  } else {
    cursorPosition = formattedValue.length;
  }

  return { formattedValue, cursorPosition };
};

const handleDateBackspace = (
  value: string,
  selectionStart: number | null,
  selectionEnd: number | null,
): { newValue: string; newCursorPosition: number } | null => {
  // 날짜 입력이 아니거나 커서 위치가 없으면 기본 동작
  if (!selectionStart || selectionStart !== selectionEnd) {
    return null;
  }

  // 온점 바로 뒤에 커서가 있는지 확인
  const charBeforeCursor = value[selectionStart - 1];
  if (charBeforeCursor !== '.') {
    return null;
  }

  // 온점 앞의 숫자를 찾아서 삭제
  let newValue = value;
  const deletePosition = selectionStart - 2; // 온점 앞 위치

  // 온점 앞에 숫자가 있는지 확인하고 삭제
  if (deletePosition >= 0 && /\d/.test(newValue[deletePosition])) {
    newValue = newValue.slice(0, deletePosition) + newValue.slice(deletePosition + 1);

    // 삭제 후 포맷팅 적용
    const { formattedValue } = formatDateInput('date', newValue, deletePosition);

    // 새로운 커서 위치 계산 (삭제된 숫자 위치)
    let newCursorPosition = deletePosition;

    // 포맷팅으로 인해 온점이 사라졌을 수 있으므로 조정
    if (formattedValue.length < value.length - 1) {
      // 온점이 사라진 경우, 커서를 해당 위치로
      newCursorPosition = Math.min(deletePosition, formattedValue.length);
    }

    return { newValue: formattedValue, newCursorPosition };
  }

  return null;
};

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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, onBlur: () => void) => {
    if (resetButtonRef.current && resetButtonRef.current.contains(e.relatedTarget)) {
      return;
    }
    onBlur();
    setIsFocused(false);
  };

  const handleReset = (onChange: (value: string) => void) => {
    onChange('');
    inputRef.current?.focus();
  };

  // '.' 을 지웠을 때 커서 위치 조정을 위한 useEffect
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
        render={({ field, fieldState }) => (
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
                onChange={(e) => {
                  const { formattedValue, cursorPosition } = formatDateInput(
                    inputType,
                    e.target.value,
                    e.target.selectionStart,
                  );
                  field.onChange(formattedValue);

                  // 커서 위치 복원 (useLayoutEffect를 통해)
                  if (inputType === 'date') {
                    setPendingCursorPosition(cursorPosition);
                  }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => handleBlur(e, field.onBlur)}
                onKeyDown={(e) => {
                  // 날짜 입력에서 백스페이스 특별 처리
                  if (inputType === 'date' && e.key === 'Backspace') {
                    const result = handleDateBackspace(
                      field.value || '',
                      e.currentTarget.selectionStart,
                      e.currentTarget.selectionEnd,
                    );

                    if (result) {
                      e.preventDefault();
                      field.onChange(result.newValue);

                      // 커서 위치 복원 (useLayoutEffect를 통해)
                      setPendingCursorPosition(result.newCursorPosition);
                      return;
                    }
                  }

                  // 기존 onKeyDown 핸들러 호출
                  onKeyDown?.(e);
                }}
                inputMode={inputType === 'date' ? 'decimal' : 'text'}
              />
              {isFocused && field.value && !disabled && (
                <button
                  className={inputResetButton}
                  ref={resetButtonRef}
                  onMouseDown={(e) => {
                    e.preventDefault(); // blur 방지
                    handleReset(field.onChange);
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
        )}
      />
    </div>
  );
};

export default JoinInput;
