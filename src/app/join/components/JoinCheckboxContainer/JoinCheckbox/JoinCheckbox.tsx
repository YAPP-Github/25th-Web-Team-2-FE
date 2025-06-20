import {
  checkboxLayout,
  checkboxWrapper,
  allCheckWrapper,
  checkbox,
  requiredCheckboxText,
  labelWrapper,
  tipWrapper,
  tipAlert,
  subLabelText,
} from './JoinCheckbox.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface JoinCheckboxProps {
  label: string;
  isChecked: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
  isRequired?: boolean;
  isAllCheck?: boolean;
  isAlert?: boolean;
  labelClassName?: string;
  emptyCheckIcon?: React.ReactNode;
  className?: string;
  subLabel?: string;
}

const JoinCheckbox = ({
  label,
  isChecked,
  onChange,
  isRequired = false,
  isAllCheck = false,
  isAlert,
  labelClassName,
  emptyCheckIcon = <Icon icon="CheckSquareEmpty" cursor="pointer" />,
  className,
  subLabel,
}: JoinCheckboxProps) => {
  return (
    <div className={`${checkboxLayout} ${isAllCheck ? allCheckWrapper : ''} ${className}`}>
      <label className={checkboxWrapper} htmlFor={label}>
        <input
          id={label}
          className={checkbox}
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
        {isChecked ? (
          <Icon icon="CheckSquareFill" color={colors.primaryMint} cursor="pointer" />
        ) : (
          emptyCheckIcon
        )}
        <div>
          <div className={labelWrapper}>
            {isRequired && <span className={requiredCheckboxText}>[필수]</span>}
            <p className={labelClassName}>
              {label}
              {subLabel && <span className={subLabelText}>&nbsp;{subLabel}</span>}
            </p>
          </div>
          {isAlert && (
            <div className={tipWrapper}>
              <span className={tipAlert}>* 내가 참여할 수 있는 실험 알림을 보내드려요</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default JoinCheckbox;
