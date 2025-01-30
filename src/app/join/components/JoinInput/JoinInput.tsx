import { Controller } from 'react-hook-form';

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

interface JoinInputProps {
  type?: 'input' | 'textarea';
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any;
  rules?: object;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  tip?: string;
  value?: string;
  maxLength?: number;
  isTip?: boolean;
}

const JoinInput = ({
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
}: JoinInputProps) => {
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
        defaultValue={value || ''}
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
                />
              )}
              {field.value && !disabled && (
                <button css={inputResetButton}>
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
