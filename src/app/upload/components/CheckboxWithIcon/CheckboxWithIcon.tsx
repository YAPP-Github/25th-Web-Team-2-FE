import { css, Theme } from '@emotion/react';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface CheckboxWithIconProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

const CheckboxWithIcon = ({ checked, onChange, label = '본문 참고' }: CheckboxWithIconProps) => {
  return (
    <div css={checkboxContainer} onClick={onChange}>
      {checked ? (
        <Icon icon="CheckSquareFill" color={colors.primaryMint} width={16} height={16} />
      ) : (
        <Icon icon="CheckSquareEmpty" color={colors.icon02} width={16} height={16} />
      )}
      <label>{label}</label>
    </div>
  );
};

export default CheckboxWithIcon;

export const checkboxContainer = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.text04};

  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  justify-content: right;
  cursor: pointer;

  label {
    cursor: pointer;
  }
`;
