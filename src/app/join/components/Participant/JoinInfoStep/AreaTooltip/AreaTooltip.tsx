'use client';

import * as Tooltip from '@radix-ui/react-tooltip';

import { tooltipContent } from './AreaTooltip.css';

import Icon from '@/components/Icon';
import ArrowTooltip from './ArrowTooltip';
import { colors } from '@/styles/colors';

const AreaTooltip = () => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button>
            <Icon icon="Information" width={18} height={18} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            align="start"
            sideOffset={2}
            alignOffset={-8}
            className={tooltipContent}
          >
            학교 소재지 등 자주 가는 지역을 추가로 입력할 수 있어요
            <Tooltip.Arrow asChild>
              <ArrowTooltip
                style={{ transform: 'rotate(180deg)', position: 'relative', top: '-1.5px' }}
              />
            </Tooltip.Arrow>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default AreaTooltip;
