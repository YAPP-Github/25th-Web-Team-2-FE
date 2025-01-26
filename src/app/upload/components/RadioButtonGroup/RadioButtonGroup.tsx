import {
  customRadioGroup,
  customRadioButton,
  activeRadioButton,
  errorRadioButton,
} from './RadioButtonGroup.styles';

interface RadioButtonGroupProps<T> {
  options: { value: T; label: string }[];
  selectedValue: T | null;
  onChange: (value: T) => void;
  isError?: boolean;
}

const RadioButtonGroup = <T extends string>({
  options,
  selectedValue,
  onChange,
  isError = false,
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
            isError && errorRadioButton(theme),
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
