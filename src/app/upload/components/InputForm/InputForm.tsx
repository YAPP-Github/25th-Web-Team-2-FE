import React, { ChangeEvent, forwardRef, useState } from 'react';

import {
  textInputContainer,
  textInput,
  textSubMessageLayout,
  textCounter,
  formMessage,
} from './InputForm.css';

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
      <div className={textInputContainer[size]}>
        <input
          {...field}
          ref={ref}
          id={id}
          className={`${textInput.default} ${fieldState?.error ? textInput.error : ''}`}
          type={type}
          placeholder={placeholder}
          value={field.value ?? ''}
          onChange={handleChange}
          maxLength={maxLength}
        />

        <div
          className={maxLength ? textSubMessageLayout.withCounter : textSubMessageLayout.noCounter}
        >
          {maxLength && (
            <div className={textCounter}>
              {textLength}/{maxLength}
            </div>
          )}
          {fieldState?.error && showErrorMessage && (
            <p className={formMessage} role="alert" aria-live="polite">
              {fieldState.error.message}
            </p>
          )}
        </div>
      </div>
    );
  },
);

InputForm.displayName = 'InputForm';

export default InputForm;
