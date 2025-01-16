import { Controller } from 'react-hook-form';
import {
  errorMessage,
  inputContainer,
  requiredStar,
  tipAlert,
  tipWrapper,
} from './JoinInput.styles';

interface JoinInputProps {
  name: string;
  control: any;
  rules?: object;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  tip?: string;
}

const JoinInput = ({
  name,
  control,
  rules = {},
  placeholder = '',
  label,
  required = false,
  disabled = false,
  tip,
  onChange,
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
            <input
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={fieldState.invalid ? 'true' : 'false'}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange();
              }}
            />
            {fieldState.error && <span css={errorMessage}>{fieldState.error.message}</span>}
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
