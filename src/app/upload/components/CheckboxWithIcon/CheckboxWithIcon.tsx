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
    <div css={checkboxLayout}>
      <div onClick={onChange} css={checkboxContainer}>
        {checked ? (
          <Icon
            icon="CheckSquareFill"
            color={colors.primaryMint}
            width={16}
            height={16}
            cursor="pointer"
          />
        ) : (
          <Icon
            icon="CheckSquareEmpty"
            color={colors.icon02}
            width={16}
            height={16}
            cursor="pointer"
          />
        )}
        <label>{label}</label>
      </div>
    </div>
  );
};

export default CheckboxWithIcon;

export const checkboxLayout = (theme: Theme) => css`
  ${theme.fonts.label.small.M12};
  color: ${theme.colors.text04};

  margin-top: 0.4rem;

  display: flex;
  justify-content: right;

  cursor: pointer;

  label {
    cursor: pointer;
  }
`;

export const checkboxContainer = css`
  width: fit-content;

  display: flex;
  flex-flow: row nowrap;

  gap: 0.2rem;
  align-items: center;
`;
