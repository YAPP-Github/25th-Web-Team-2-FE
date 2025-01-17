import { css, Theme } from '@emotion/react';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface CheckboxWithIconProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'large';
}

const CheckboxWithIcon = ({
  checked,
  onChange,
  label = '본문 참고',
  align = 'right',
  size = 'small',
}: CheckboxWithIconProps) => {
  return (
    <div css={(theme: Theme) => checkboxLayout(theme, align, size)}>
      <div onClick={onChange} css={checkboxContainer(size)}>
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

export const checkboxLayout = (
  theme: Theme,
  align: 'left' | 'center' | 'right',
  size: 'small' | 'large',
) => css`
  ${size === 'small' ? theme.fonts.label.small.M12 : theme.fonts.label.large.R14};
  color: ${theme.colors.text04};

  margin-top: 0.4rem;

  display: flex;
  justify-content: ${align};

  cursor: pointer;

  label {
    cursor: pointer;
  }
`;

export const checkboxContainer = (size: 'small' | 'large') => css`
  width: fit-content;

  display: flex;
  flex-flow: row nowrap;
  gap: ${size === 'small' ? '0.2rem' : '0.4rem'};
  align-items: center;
`;
