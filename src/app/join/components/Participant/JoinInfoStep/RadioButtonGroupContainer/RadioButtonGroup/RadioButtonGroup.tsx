import { customRadioGroup, customRadioButton, activeRadioButton } from './RadioButtonGroup.styles';

interface RadioButtonGroupProps<T> {
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  selectedValue?: T;
  isError: boolean;
}

const RadioButtonGroup = <T extends string>({
  options,
  selectedValue,
  onChange,
  isError,
}: RadioButtonGroupProps<T>) => {
  return (
    <div css={customRadioGroup}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-invalid={isError}
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
