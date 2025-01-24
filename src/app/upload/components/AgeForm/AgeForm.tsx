import { ChangeEvent, forwardRef } from 'react';
import { inputStyle, textInputContainer } from './AgeForm.styles';

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
    <div css={textInputContainer}>
      <input
        {...field}
        ref={ref}
        id={id}
        type="number"
        css={inputStyle}
        placeholder={placeholder}
        value={field.value || ''}
      />
    </div>
  );
});

AgeForm.displayName = 'AgeForm';

export default AgeForm;
