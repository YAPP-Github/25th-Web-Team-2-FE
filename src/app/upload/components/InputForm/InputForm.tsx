import React, { ChangeEvent, forwardRef, useState } from 'react';
import {
  textInputContainer,
  textInput,
  textSubMessageLayout,
  textCounter,
  formMessage,
} from './InputForm.styles';

interface InputFormProps {
  id: string;
  field: {
    name: string;
    value: string | number | null;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: VoidFunction;
  };
  fieldState: {
    error?: {
      message?: string;
    };
  };
  placeholder?: string;
  type?: string;
  showErrorMessage?: boolean;
  size?: 'half' | 'full';
  maxLength?: number;
}

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  (
    {
      field,
      fieldState,
      placeholder,
      type = 'text',
      id,
      showErrorMessage = true,
      size = 'half',
      maxLength,
    },
    ref,
  ) => {
    const [textLength, setTextLength] = useState(
      typeof field.value === 'string' ? field.value.length : 0,
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      field.onChange(e);
      setTextLength(e.target.value.length);
    };

    return (
      <div css={textInputContainer(size)}>
        <input
          {...field}
          ref={ref}
          id={id}
          css={(theme) => textInput(theme, fieldState?.error ? 'error' : '')}
          type={type}
          placeholder={placeholder}
          value={field.value || ''}
          onChange={handleChange}
          maxLength={maxLength}
        />

        <div css={textSubMessageLayout(!!maxLength)}>
          {maxLength && (
            <div css={textCounter}>
              {textLength}/{maxLength}
            </div>
          )}
          {fieldState?.error && showErrorMessage && (
            <p css={formMessage}>{fieldState.error.message}</p>
          )}
        </div>
      </div>
    );
  },
);

InputForm.displayName = 'InputForm';

export default InputForm;
