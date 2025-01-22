import { Controller } from 'react-hook-form';

import {
  errorMessage,
  inputContainer,
  requiredStar,
  textCount,
  tipAlert,
  tipWrapper,
} from './JoinInput.styles';

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
  onChange?: () => void;
  tip?: string;
  value?: string;
  onBlur?: () => void;
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
  value = '',
  onChange,
  onBlur,
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
        render={({ field, fieldState }) => (
          <>
            {type === 'input' ? (
              <input
                {...field}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                aria-invalid={fieldState.invalid ? true : false}
                onChange={(e) => {
                  field.onChange(e);
                  if (onChange) onChange();
                }}
                onBlur={onBlur}
              />
            ) : (
              <textarea
                {...field}
                placeholder={placeholder}
                disabled={disabled}
                aria-invalid={fieldState.invalid ? true : false}
                onChange={(e) => {
                  field.onChange(e);
                  if (onChange) onChange();
                }}
                rows={3}
                maxLength={100}
              />
            )}
            {fieldState.error && <span css={errorMessage}>{fieldState.error.message}</span>}
            {type === 'textarea' && <span css={textCount}>{field.value?.length || 0}/100</span>}
          </>
        )}
      />
      {tip && (
        <div css={tipWrapper}>
          <span css={tipAlert}>Tip</span>
          <span>{tip}</span>
        </div>
      )}
    </div>
  );
};

export default JoinInput;
