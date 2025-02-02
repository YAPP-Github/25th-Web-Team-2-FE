import { ChangeEvent, forwardRef } from 'react';

import { ageInput, ageFormContainer } from './AgeForm.css';

interface AgeFormProps {
  id: string;
  field: {
    name: string;
    value: string | number | null;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: VoidFunction;
  };
  placeholder?: string;
}

const AgeForm = forwardRef<HTMLInputElement, AgeFormProps>(({ field, placeholder, id }, ref) => {
  return (
    <div className={ageFormContainer}>
      <input
        {...field}
        ref={ref}
        id={id}
        type="number"
        className={ageInput}
        placeholder={placeholder}
        value={field.value || ''}
      />
    </div>
  );
});

AgeForm.displayName = 'AgeForm';

export default AgeForm;
