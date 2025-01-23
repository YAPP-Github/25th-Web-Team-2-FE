import { css, Theme } from '@emotion/react';
import { useState } from 'react';

import { input } from '@/app/upload/components/UploadContainer/UploadContainer';

interface InputFormProps {
  id: string;
  field: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: VoidFunction;
  };
  fieldState: {
    error?: {
      message?: string;
    };
  };
  placeholder?: string;
  type?: string;
  showErrorMessage?: boolean;
  size?: 'half' | 'full';
  maxLength?: number;
}

const InputForm = ({
  field,
  fieldState,
  placeholder,
  type = 'text',
  id,
  showErrorMessage = true,
  size = 'half',
  maxLength,
}: InputFormProps) => {
  const [textLength, setTextLength] = useState(field.value?.length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    setTextLength(e.target.value.length);
  };

  return (
    <div css={textInputContainer(size)}>
      <input
        {...field}
        id={id}
        css={(theme) => input(theme, !!fieldState.error)}
        type={type}
        placeholder={placeholder}
        value={field.value || ''}
        onChange={handleChange}
        maxLength={maxLength}
      />

      <div css={textSubMessageLayout}>
        {maxLength && (
          <div css={textCounter}>
            {textLength}/{maxLength}
          </div>
        )}
        {fieldState?.error && showErrorMessage && (
          <p css={formMessage}>{fieldState.error.message}</p>
        )}
      </div>
    </div>
  );
};

export default InputForm;

const textInputContainer = (size: 'half' | 'full') => css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;

  width: 100%;
  max-width: ${size === 'half' ? '45.2rem' : '93.6rem'};
`;

const textCounter = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.text02};

  text-align: right;
`;

const textSubMessageLayout = css`
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: space-between;
  align-items: center;
`;

const formMessage = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.textAlert};
  margin: 0;
`;
