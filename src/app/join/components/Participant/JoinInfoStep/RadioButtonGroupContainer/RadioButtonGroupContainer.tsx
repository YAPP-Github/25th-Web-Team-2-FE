import RadioButtonGroup from './RadioButtonGroup/RadioButtonGroup';
import {
  labelWrapper,
  radioButtonGroupContainerLayout,
  requiredStar,
  tipWrapper,
} from './RadioButtonGroupContainer.styles';

interface RadioButtonGroupProps<T> {
  title: string;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  selectedValue?: T;
  required?: boolean;
  tip?: string;
}

const RadioButtonGroupContainer = <T extends string>({
  title,
  options,
  onChange,
  selectedValue,
  required = false,
  tip,
}: RadioButtonGroupProps<T>) => {
  return (
    <div css={radioButtonGroupContainerLayout}>
      <div css={labelWrapper}>
        <span>{title}</span>
        {required && <span css={requiredStar}>*</span>}
      </div>
      <RadioButtonGroup<T> options={options} selectedValue={selectedValue} onChange={onChange} />
      {tip && (
        <div css={tipWrapper}>
          <span>{tip}</span>
        </div>
      )}
    </div>
  );
};

export default RadioButtonGroupContainer;
