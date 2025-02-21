'use client';

import * as Tooltip from '@radix-ui/react-tooltip';

import { tooltipArrow, tooltipContent } from './AreaTooltip.css';

import Icon from '@/components/Icon';

const AreaTooltip = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button>
            <Icon icon="Information" width={18} height={18} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" sideOffset={2} className={tooltipContent}>
            학교 소재지 등 자주 가는 지역을 추가로 입력할 수 있어요
            <Tooltip.Arrow className={tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default AreaTooltip;
