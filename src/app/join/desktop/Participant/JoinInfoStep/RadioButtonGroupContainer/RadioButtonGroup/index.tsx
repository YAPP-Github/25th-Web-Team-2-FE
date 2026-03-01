'use client';

import {
  customRadioGroup,
  customRadioButton,
  activeRadioButton,
  errorRadioButton,
} from './RadioButtonGroup.css';

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
    <div className={customRadioGroup}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`
            ${customRadioButton}
            ${selectedValue === option.value ? activeRadioButton : ''}
            ${isError ? errorRadioButton : ''}
          `}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
