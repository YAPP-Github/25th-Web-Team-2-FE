import {
  checkboxLayout,
  checkboxWrapper,
  allCheckWrapper,
  checkbox,
  requiredCheckboxText,
  labelWrapper,
  tipWrapper,
  tipAlert,
} from './JoinCheckbox.css';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

interface JoinCheckboxProps {
  label: string;
  isChecked: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
  isRequired?: boolean;
  isAllCheck?: boolean;
  isArrow?: boolean;
  isAlert?: boolean;
}

const JoinCheckbox = ({
  label,
  isChecked,
  onChange,
  isRequired = false,
  isAllCheck = false,
  isArrow = true,
  isAlert,
}: JoinCheckboxProps) => {
  return (
    <div className={`${checkboxLayout} ${isAllCheck ? allCheckWrapper : ''}`}>
      <label className={checkboxWrapper}>
        <input className={checkbox} type="checkbox" checked={isChecked} onChange={onChange} />
        {isChecked ? (
          <Icon icon="CheckSquareFill" color={theme.colors.primaryMint} />
        ) : (
          <Icon icon="CheckSquareEmpty" />
        )}
        <div>
          <div className={labelWrapper}>
            {isRequired && <span className={requiredCheckboxText}>[필수]</span>}
            <span>{label}</span>
          </div>
          {isAlert && (
            <div className={tipWrapper}>
              <span className={tipAlert}>* 내가 참여할 수 있는 실험 알림을 보내드려요</span>
            </div>
          )}
        </div>
      </label>
      {isArrow && <Icon icon="Chevron" width={20} height={20} />}
    </div>
  );
};

export default JoinCheckbox;
