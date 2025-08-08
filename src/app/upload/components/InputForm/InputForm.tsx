import React from 'react';
import { ControllerRenderProps, FieldError } from 'react-hook-form';

import {
  textInputContainer,
  textInput,
  textSubMessageLayout,
  textCounter,
  formMessage,
} from './InputForm.css';

import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';

interface InputFormProps {
  id: string;
  field: ControllerRenderProps<
    UploadExperimentPostSchemaType,
    | 'leadResearcher'
    | 'reward'
    | 'place'
    | 'detailedAddress'
    | 'title'
    | 'applyMethodInfo.formUrl'
    | 'applyMethodInfo.phoneNum'
  >;
  error?: FieldError;
  placeholder?: string;
  type?: string;
  showErrorMessage?: boolean;
  size?: 'half' | 'full';
  maxLength?: number;
}

const InputForm = ({
  id,
  field,
  error,
  placeholder,
  type = 'text',
  showErrorMessage = true,
  size = 'half',
  maxLength,
}: InputFormProps) => {
  const textLength = (field.value ?? '').length;

  return (
    <div className={textInputContainer[size]}>
      <input
        {...field}
        value={field.value ?? ''}
        id={id}
        className={`${textInput.default} ${error ? textInput.error : ''}`}
        type={type}
        placeholder={placeholder}
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
        {error && showErrorMessage && (
          <p className={formMessage} role="alert" aria-live="polite">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputForm;
