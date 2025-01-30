import {
  customRadioGroup,
  customRadioButton,
  activeRadioButton,
  errorRadioButton,
} from './RadioButtonGroup.styles';

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
          css={[
            customRadioButton,
            selectedValue === option.value && activeRadioButton,
            isError && errorRadioButton,
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
