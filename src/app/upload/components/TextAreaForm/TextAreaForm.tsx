import { ControllerRenderProps, FieldError } from 'react-hook-form';

import {
  formMessage,
  textCounter,
  textInput,
  textInputContainer,
  textSubMessageLayout,
} from '../InputForm/InputForm.css';

import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';

interface TextAreaFormProps {
  id: string;
  field: ControllerRenderProps<
    UploadExperimentPostSchemaType,
    'targetGroupInfo.otherCondition' | 'applyMethodInfo.content'
  >;
  error?: FieldError;
  height: number;
  placeholder?: string;
  maxLength?: number;
}

const TextAreaForm = ({ field, placeholder, id, error, maxLength, height }: TextAreaFormProps) => {
  const textLength = (field.value ?? '').length;

  return (
    <div className={textInputContainer['full']}>
      <textarea
        {...field}
        id={id}
        className={`${textInput.default} ${error ? textInput.error : ''}`}
        placeholder={placeholder}
        maxLength={maxLength}
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
        {error && (
          <p className={formMessage} role="alert" aria-live="polite">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextAreaForm;
