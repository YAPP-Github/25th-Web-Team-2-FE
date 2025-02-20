import { forwardRef } from 'react';

import { customRadioGroup, customRadioButton } from './RadioButtonGroup.css';

interface RadioButtonGroupProps<T extends string> {
  options: { value: T; label: string }[];
  selectedValue: T | null;
  onChange: (value: T | null) => void;
  isError?: boolean;
}

const RadioButtonGroup = forwardRef<HTMLButtonElement, RadioButtonGroupProps<string>>(
  ({ options, selectedValue, onChange, isError = false }, ref) => {
    return (
      <div className={customRadioGroup}>
        {options.map((option) => (
          <button
            key={option.value}
            ref={selectedValue === option.value ? ref : undefined}
            type="button"
            className={customRadioButton({
              active: selectedValue === option.value,
              error: isError,
            })}
            onClick={() => {
              onChange(selectedValue === option.value ? null : (option.value as string));
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';

export default RadioButtonGroup;
