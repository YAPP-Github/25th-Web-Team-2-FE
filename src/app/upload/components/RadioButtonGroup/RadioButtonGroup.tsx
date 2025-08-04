import { ControllerRenderProps } from 'react-hook-form';

import { customRadioGroup, customRadioButton } from './RadioButtonGroup.css';

import { UploadExperimentPostSchemaType } from '@/schema/upload/uploadExperimentPostSchema';

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
};

export default RadioButtonGroup;
