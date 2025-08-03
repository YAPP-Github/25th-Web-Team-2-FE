import { ChangeEvent, forwardRef } from 'react';

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
    value: string | null;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: VoidFunction;
  };
  fieldState: {
    error?: { message?: string };
  };
  height: number;
  placeholder?: string;
  showErrorMessage?: boolean;
  maxLength?: number;
}

const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  ({ field, fieldState, placeholder, id, showErrorMessage = true, maxLength, height }, ref) => {
    const textLength = (field.value ?? '').length;

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
          style={{
            height: `${height}px`,
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
          {fieldState?.error && showErrorMessage && fieldState.error.message !== '' && (
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
