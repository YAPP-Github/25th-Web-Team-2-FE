import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { inputContainer } from './UnivAutoCompleteInput.css';
import Icon from '../Icon';
import AutoCompleteDropdown from './components/AutoCompleteDropdown/AutoCompleteDropdown';

import {
  inputLabel,
  inputResetButton,
  inputWrapper,
  joinInput,
  requiredStar,
} from '@/app/join/components/JoinInput/JoinInput.css';

interface UnivAutoCompleteInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

const UnivAutoCompleteInput = <T extends FieldValues>({
  name,
  control,
  label,
  required,
  placeholder,
}: UnivAutoCompleteInputProps<T>) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          field.onChange(e.target.value);
          setQuery(e.target.value);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          if (!e.relatedTarget?.closest('[data-suggestion]')) {
            setShowDropdown(false);
          }
          field.onBlur();
        };

        const handleClickAutoComplete = (univName: string) => {
          field.onChange(univName);
          setQuery(univName);
          setShowDropdown(false);
        };

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
                placeholder={placeholder}
                className={joinInput}
                aria-invalid={fieldState.invalid ? true : false}
                style={{ width: '100%' }}
                onChange={handleChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={handleBlur}
              />
              {showDropdown ? (
                <button className={inputResetButton} onClick={() => setQuery('')}>
                  <Icon icon="CloseRound" width={22} height={22} cursor="pointer" />
                </button>
              ) : (
                <button className={inputResetButton} disabled={true}>
                  <Icon icon="SearchRound" cursor="pointer" />
                </button>
              )}
            </div>

            {/* 자동완성 드롭다운 */}
            <AutoCompleteDropdown
              showDropdown={showDropdown}
              query={query}
              onClick={handleClickAutoComplete}
            />
          </div>
        );
      }}
    />
  );
};

export default UnivAutoCompleteInput;
