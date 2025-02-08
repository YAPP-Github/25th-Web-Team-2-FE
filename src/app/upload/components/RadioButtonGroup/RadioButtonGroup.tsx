import { customRadioGroup, customRadioButton } from './RadioButtonGroup.css';

interface RadioButtonGroupProps<T> {
  options: { value: T; label: string }[];
  selectedValue: T | null;
  onChange: (value: T | null) => void;
  isError?: boolean;
}

const RadioButtonGroup = <T extends string>({
  options,
  selectedValue,
  onChange,
  isError = false,
}: RadioButtonGroupProps<T>) => {
  return (
    <div className={customRadioGroup}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={customRadioButton({
            active: selectedValue === option.value,
            error: isError,
          })}
          onClick={() => {
            if (selectedValue === option.value) {
              onChange(null);
            } else {
              onChange(option.value);
            }
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
