import { customRadioGroup, customRadioButton, activeRadioButton } from './RadioButtonGroup.styles';

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
