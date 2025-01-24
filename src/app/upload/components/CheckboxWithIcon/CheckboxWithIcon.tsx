import { css, Theme } from '@emotion/react';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';
import { checkboxLayout, checkboxContainer } from './CheckboxWithIcon.styles';

interface CheckboxWithIconProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'large';
  boldStyle?: boolean;
}

const CheckboxWithIcon = ({
  checked,
  onChange,
  label = '본문 참고',
  align = 'right',
  size = 'small',
  boldStyle = false,
}: CheckboxWithIconProps) => {
  return (
    <div css={(theme: Theme) => checkboxLayout(theme, align, size, boldStyle)}>
      <div onClick={onChange} css={checkboxContainer(size)}>
        {checked ? (
          <Icon
            icon="CheckSquareFill"
            color={colors.primaryMint}
            width={boldStyle ? 18 : 16}
            height={boldStyle ? 18 : 16}
            cursor="pointer"
          />
        ) : (
          <Icon
            icon="CheckSquareEmpty"
            color={boldStyle ? colors.text05 : colors.icon02}
            width={boldStyle ? 18 : 16}
            height={boldStyle ? 18 : 16}
            cursor="pointer"
          />
        )}
        <p>{label}</p>
      </div>
    </div>
  );
};

export default CheckboxWithIcon;
