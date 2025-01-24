import { css, Theme } from '@emotion/react';
import React, { forwardRef, useState } from 'react';

interface InputFormProps {
  id: string;
  field: {
    name: string;
    value: string | null;
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

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  (
    {
      field,
      fieldState,
      placeholder,
      type = 'text',
      id,
      showErrorMessage = true,
      size = 'half',
      maxLength,
    },
    ref,
  ) => {
    const [textLength, setTextLength] = useState(field.value?.length || 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      field.onChange(e);
      setTextLength(e.target.value.length);
    };

    return (
      <div css={textInputContainer(size)}>
        <input
          {...field}
          ref={ref} // ref 전달
          id={id}
          css={(theme) => textInput(theme, fieldState?.error ? 'error' : '')}
          type={type}
          placeholder={placeholder}
          value={field.value || ''}
          onChange={handleChange}
          maxLength={maxLength}
        />

        <div css={textSubMessageLayout(!!maxLength)}>
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
  },
);

InputForm.displayName = 'InputForm'; // 컴포넌트 이름 설정

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

const textSubMessageLayout = (showTextCounter: boolean) => css`
  display: flex;
  flex-flow: ${showTextCounter ? 'row-reverse nowrap' : 'row nowrap'};
  justify-content: space-between;
  align-items: center;
`;

const formMessage = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.textAlert};
  margin: 0;
`;

const textInput = (theme: Theme, status: string) => css`
  ${theme.fonts.label.large.R14};

  width: 100%;
  height: 4.8rem;
  padding: 0.8rem 1.2rem;
  border: 0.1rem solid ${status === 'error' ? theme.colors.textAlert : theme.colors.line01};
  border-radius: 1.2rem;
  color: ${theme.colors.text06};

  &:focus {
    border-color: ${status === 'error' ? theme.colors.textAlert : theme.colors.lineTinted};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.text02};
    ${theme.fonts.label.large.R14};
  }
`;
