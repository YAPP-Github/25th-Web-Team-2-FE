import { css, Theme } from '@emotion/react';
import { useState, useRef } from 'react';

import Icon from '@/components/Icon';

const AreaTooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleToggleTooltip = () => {
    setIsTooltipVisible((prev) => !prev);
  };

  return (
    <div css={tooltipLayout}>
      <div css={tooltipWrapper}>
        <button onClick={handleToggleTooltip}>
          <Icon icon="Information" width={18} height={18} />
        </button>
        {isTooltipVisible && (
          <div css={tooltip} ref={tooltipRef}>
            학교 소재지 등 자주 가는 지역을 추가로 입력할 수 있어요
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaTooltip;

const tooltipLayout = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const tooltipWrapper = css`
  position: relative;
  display: flex;
  align-items: center;
`;

const tooltip = (theme: Theme) => css`
  ${theme.fonts.label.medium.M13};
  width: 20rem;
  position: absolute;
  left: 2.4rem;
  background-color: ${theme.colors.field01};
  border-radius: 0.6rem;
  padding: 0.8rem 1.6rem;
  color: ${theme.colors.text05};
  box-shadow: 0 4px 8px rgba(16, 17, 18, 0.1);
  border: 0.15rem solid ${theme.colors.line01};
  color: ${theme.colors.text05};
`;
