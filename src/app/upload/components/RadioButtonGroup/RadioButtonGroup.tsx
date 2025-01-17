import { css, Theme } from '@emotion/react';

interface RadioButtonGroupProps<T> {
  options: { value: T; label: string }[];
  selectedValue: T | null;
  onChange: (value: T) => void;
}

const RadioButtonGroup = <T extends string>({
  options,
  selectedValue,
  onChange,
}: RadioButtonGroupProps<T>) => {
  return (
    <div css={customRadioGroup}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          css={(theme) => [
            customRadioButton(theme),
            selectedValue === option.value && activeRadioButton(theme),
          ]}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default RadioButtonGroup;

const customRadioGroup = css`
  display: flex;
  flex-flow: row nowrap;
  gap: 0.8rem;
`;

const customRadioButton = (theme: Theme) => css`
  ${theme.fonts.label.large.M14};

  width: 14.533rem;
  height: 4.8rem;

  padding: 1rem 2rem;

  border: 0.1rem solid ${theme.colors.line01};
  border-radius: 1.2rem;

  background-color: ${theme.colors.field01};

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.field02};
  }
`;

const activeRadioButton = (theme: Theme) => css`
  border: 0.1rem solid ${theme.colors.lineTinted};

  background-color: ${theme.colors.primaryTinted};
  color: ${theme.colors.textPrimary};

  &:hover {
    background-color: ${theme.colors.primaryTinted};
  }
`;
