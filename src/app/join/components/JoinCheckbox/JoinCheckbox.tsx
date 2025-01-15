import {
  allCheckWrapper,
  checkbox,
  checkboxLayout,
  checkboxWrapper,
  requiredCheckboxText,
} from './JoinCheckbox.styles';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

interface JoinCheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
  isRequired?: boolean;
  isAllCheck?: boolean;
}

const JoinCheckbox = ({
  label,
  isChecked,
  onChange,
  isRequired = false,
  isAllCheck = false,
}: JoinCheckboxProps) => {
  return (
    <div css={[checkboxLayout, isAllCheck && allCheckWrapper]}>
      <label css={checkboxWrapper}>
        <input css={checkbox} type="checkbox" checked={isChecked} onChange={onChange} />
        {isChecked ? (
          <Icon icon="CheckSquareFill" color={theme.colors.primaryMint} />
        ) : (
          <Icon icon="CheckSquareEmpty" />
        )}
        <div>
          {isRequired && <span css={requiredCheckboxText}>[필수]</span>}
          <span>{label}</span>
        </div>
      </label>
      <Icon icon="Chevron" width={20} height={20} />
    </div>
  );
};

export default JoinCheckbox;
