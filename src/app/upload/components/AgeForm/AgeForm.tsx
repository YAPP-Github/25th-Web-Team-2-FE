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
  setIsFocused: (value: boolean) => void;
}

const AgeForm = forwardRef<HTMLInputElement, AgeFormProps>(
  ({ field, placeholder, id, setIsFocused }, ref) => {
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
          ref={ref}
          id={id}
          className={ageInput}
          placeholder={placeholder}
          value={field.value || ''}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    );
  },
);

AgeForm.displayName = 'AgeForm';

export default AgeForm;
