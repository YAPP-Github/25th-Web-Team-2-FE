import { css, Theme } from '@emotion/react';
import { ChangeEvent, forwardRef } from 'react';

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

const textInputContainer = () => css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;

  width: 100%;
`;

const inputStyle = (theme: Theme) => css`
  ${theme.fonts.label.large.R14};

  width: 17.2rem;
  height: 2.2rem;

  text-align: center;

  border: none;
  outline: none;

  &::placeholder {
    color: ${theme.colors.text02};
  }
`;
