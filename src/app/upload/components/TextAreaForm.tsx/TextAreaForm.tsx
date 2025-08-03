import { ChangeEvent, forwardRef, useState } from 'react';

import {
  formMessage,
  textCounter,
  textInput,
  textInputContainer,
  textSubMessageLayout,
} from '../InputForm/InputForm.css';

interface TextAreaFormProps {
  id: string;
  field: {
    name: string;
    value: string | number | null;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: VoidFunction;
  };
  fieldState: {
    error?: { message?: string };
  };
  maxHeight: number;
  placeholder?: string;
  showErrorMessage?: boolean;
  maxLength?: number;
}

const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  ({ field, fieldState, placeholder, id, showErrorMessage = true, maxLength, maxHeight }, ref) => {
    const [textLength, setTextLength] = useState(
      typeof field.value === 'string' ? field.value.length : 0,
    );

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      field.onChange(e);
      setTextLength(e.target.value.length);
    };

    return (
      <div className={textInputContainer['full']}>
        <textarea
          id={id}
          {...field}
          ref={ref}
          className={`${textInput.default} ${fieldState?.error ? textInput.error : ''}`}
          placeholder={placeholder}
          maxLength={maxLength}
          value={field.value ?? ''}
          onChange={handleChange}
          style={{
            minHeight: `${maxHeight}px`,
            maxWidth: '93.6rem',
            overflowY: 'auto',
          }}
        />

        <div
          className={maxLength ? textSubMessageLayout.withCounter : textSubMessageLayout.noCounter}
        >
          {maxLength && (
            <div className={textCounter}>
              {textLength}/{maxLength}
            </div>
          )}
          {fieldState?.error?.message && showErrorMessage && (
            <p className={formMessage} role="alert" aria-live="polite">
              {fieldState.error.message}
            </p>
          )}
        </div>
      </div>
    );
  },
);

TextAreaForm.displayName = 'TextAreaForm';

export default TextAreaForm;
