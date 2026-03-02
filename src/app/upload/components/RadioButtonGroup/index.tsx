import { ControllerRenderProps } from 'react-hook-form';

import { UploadExperimentPostSchemaType } from '@schema/upload/uploadExperimentPostSchema';

import { customRadioGroup, customRadioButton } from './RadioButtonGroup.css';


interface RadioButtonGroupProps<T extends string> {
  field: ControllerRenderProps<
    UploadExperimentPostSchemaType,
    'matchType' | 'targetGroupInfo.genderType'
  >;
  options: { value: string; label: string }[];
  isError?: boolean;
  onChange: (value: T | null) => void;
}

const RadioButtonGroup = ({
  field: { value: selectedValue, ref },
  onChange,
  options,
  isError = false,
}: RadioButtonGroupProps<string>) => {
  return (
    <div className={customRadioGroup}>
      {options.map((option) => (
        <button
          key={option.value}
          ref={ref}
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
};

export default RadioButtonGroup;
