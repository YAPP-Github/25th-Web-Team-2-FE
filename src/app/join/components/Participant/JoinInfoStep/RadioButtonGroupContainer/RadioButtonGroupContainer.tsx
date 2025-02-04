'use client';

import { Controller } from 'react-hook-form';

import RadioButtonGroup from './RadioButtonGroup/RadioButtonGroup';
import {
  labelWrapper,
  radioButtonGroupContainerLayout,
  requiredStar,
  tipWrapper,
} from './RadioButtonGroupContainer.css';

interface RadioButtonGroupProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: 'gender' | 'matchType';
  title: string;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  required?: boolean;
  tip?: string;
}

const RadioButtonGroupContainer = <T extends string>({
  control,
  name,
  title,
  options,
  onChange,
  required = false,
  tip,
}: RadioButtonGroupProps<T>) => {
  return (
    <div className={radioButtonGroupContainerLayout}>
      <div className={labelWrapper}>
        <span>{title}</span>
        {required && <span className={requiredStar}>*</span>}
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <RadioButtonGroup<T>
              options={options}
              selectedValue={field.value}
              onChange={onChange}
              isError={Boolean(fieldState.error) && Boolean(!field.value)}
            />
          </>
        )}
      />

      {tip && (
        <div className={tipWrapper}>
          <span>{tip}</span>
        </div>
      )}
    </div>
  );
};

export default RadioButtonGroupContainer;
