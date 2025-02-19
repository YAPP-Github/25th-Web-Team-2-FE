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

      // 빈 문자열이거나 양의 정수만 허용
      if (value === '' || /^[0-9]\d*$/.test(value)) {
        field.onChange(e);
      }
    };

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
