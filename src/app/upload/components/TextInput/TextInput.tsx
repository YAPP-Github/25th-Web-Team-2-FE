import { css, Theme } from '@emotion/react';
import { forwardRef, useState } from 'react';

interface TextInputProps {
  id: string;
  placeholder: string;
  maxLength: number;
  message?: string;
  status?: 'error' | '';
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, placeholder, maxLength, message, status = '' }, ref) => {
    const [textLength, setTextLength] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTextLength(e.target.value.length);
    };

    return (
      <div css={textInputContainer}>
        <input
          ref={ref}
          id={id}
          type="text"
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleChange}
          css={(theme) => textInput(theme, status)}
        />
        <div css={textSubMessageLayout}>
          <div css={textCounter}>
            {textLength}/{maxLength}
          </div>
          {status === 'error' && message && <p css={formMessage}>{message}</p>}
        </div>
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';

const textInputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
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

const textCounter = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.text02};

  text-align: right;
`;

const formMessage = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.textAlert};
  margin: 0;
`;

const textSubMessageLayout = css`
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: space-between;
  align-items: center;
`;
