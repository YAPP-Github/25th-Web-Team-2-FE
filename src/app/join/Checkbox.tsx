import { css, Theme } from '@emotion/react';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
  isRequired?: boolean;
  isAllCheck?: boolean;
}

const Checkbox = ({
  label,
  isChecked,
  onChange,
  isRequired = false,
  isAllCheck = false,
}: CheckboxProps) => {
  return (
    <div css={[checkboxContainer, isAllCheck && allCheckWrapper]}>
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

export default Checkbox;

export const checkboxContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const checkboxWrapper = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  div {
    display: flex;
    gap: 0.4rem;
  }

  span {
    user-select: none;
  }
`;

export const allCheckWrapper = (theme: Theme) => css`
  border-bottom: 0.1rem solid ${theme.colors.line01};
  padding-bottom: 1.6rem;
`;

export const checkbox = css`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const requiredCheckboxText = (theme: Theme) => css`
  color: ${theme.colors.textPrimary};
`;
