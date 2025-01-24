import RadioButtonGroup from './RadioButtonGroup/RadioButtonGroup';
import {
  labelWrapper,
  radioButtonGroupContainerLayout,
  requiredStar,
} from './RadioButtonGroupContainer.styles';

interface RadioButtonGroupProps<T> {
  title: string;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  selectedValue?: T;
  required?: boolean;
}

const RadioButtonGroupContainer = <T extends string>({
  title,
  options,
  onChange,
  selectedValue,
  required = false,
}: RadioButtonGroupProps<T>) => {
  return (
    <div css={radioButtonGroupContainerLayout}>
      <div css={labelWrapper}>
        <span>{title}</span>
        {required && <span css={requiredStar}>*</span>}
      </div>
      <RadioButtonGroup<T> options={options} selectedValue={selectedValue} onChange={onChange} />
    </div>
  );
};

export default RadioButtonGroupContainer;
