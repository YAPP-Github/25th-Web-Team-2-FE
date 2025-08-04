import { ChangeEvent } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { ageInput, ageFormContainer } from './AgeForm.css';

import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';

interface AgeFormProps {
  id: string;
  field: ControllerRenderProps<
    UploadExperimentPostSchemaType,
    'targetGroupInfo.startAge' | 'targetGroupInfo.endAge'
  >;
  placeholder?: string;
}

const AgeForm = ({ id, field, placeholder }: AgeFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      field.onChange(e);
    }
  };

  return (
    <div className={ageFormContainer}>
      <input
        {...field}
        id={id}
        className={ageInput}
        placeholder={placeholder}
        value={field.value?.toString() ?? ''}
        onChange={handleChange}
      />
    </div>
  );
};

export default AgeForm;
