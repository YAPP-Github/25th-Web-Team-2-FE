import { useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import {
  inputContainer,
  inputLabel,
  requiredStar,
  joinInput,
  inputWrapper,
  inputResetButton,
} from './UnivAutoCompleteInput.css';
import Icon from '../Icon';
import AutoCompleteDropdown from './components/AutoCompleteDropdown/AutoCompleteDropdown';

import { textInput } from '@/app/upload/components/InputForm/InputForm.css';

interface UnivAutoCompleteInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;

  inputClassName?: string;
}

const UnivAutoCompleteInput = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  placeholder,

  inputClassName,
}: UnivAutoCompleteInputProps<T>) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // 리셋 후 인풋 포커스 유지
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 리셋 버튼 클릭 시 blur 방지
  const resetButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          if (resetButtonRef.current && resetButtonRef.current.contains(e.relatedTarget)) {
            return;
          }

          if (!e.relatedTarget?.closest('[data-suggestion]')) {
            setShowDropdown(false);
          }
          field.onBlur();
        };

        const handleClickAutoComplete = (univName: string) => {
          field.onChange(univName);
          setShowDropdown(false);
        };

        const handleReset = () => {
          field.onChange('');
          inputRef.current?.focus();
        };

        // 에러 스타일
        const inputStyleClass = [
          textInput.default,
          inputClassName ?? joinInput,
          fieldState.invalid ? textInput.error : '',
        ].join(' ');

        return (
          <div className={inputContainer}>
            {label && (
              <label className={inputLabel} htmlFor={name}>
                <span>{label}</span>
                {required && <span className={requiredStar}>*</span>}
              </label>
            )}

            <div className={inputWrapper}>
              <input
                {...field}
                id={name}
                value={field.value ?? ''}
                ref={(el) => {
                  field.ref(el);
                  inputRef.current = el;
                }}
                placeholder={placeholder}
                className={inputStyleClass}
                aria-invalid={fieldState.invalid ? true : false}
                style={{ width: '100%' }}
                onFocus={() => setShowDropdown(true)}
                onBlur={handleBlur}
              />
              {field.value?.length > 0 ? (
                <button className={inputResetButton} ref={resetButtonRef} onClick={handleReset}>
                  <Icon icon="CloseRound" width={22} height={22} cursor="pointer" />
                </button>
              ) : (
                <button className={inputResetButton} disabled={true}>
                  <Icon icon="SearchRound" cursor="pointer" />
                </button>
              )}
            </div>

            <AutoCompleteDropdown
              showDropdown={showDropdown}
              query={field.value}
              onClick={handleClickAutoComplete}
            />
          </div>
        );
      }}
    />
  );
};

export default UnivAutoCompleteInput;
