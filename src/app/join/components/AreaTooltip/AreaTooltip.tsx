'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { useEffect, useState } from 'react';

import { tooltipContent } from './AreaTooltip.css';
import ArrowTooltip from './ArrowTooltip';

import Icon from '@/components/Icon';
import { ONE_SECOND } from '@/constants/time';
import { isMobile } from '@/utils/deviceType';

const AreaTooltip = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (isMobile()) {
      setOpen(true);

      const timer = setTimeout(() => {
        setOpen(false);
      }, ONE_SECOND * 5);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={open} onOpenChange={toggle}>
        <Tooltip.Trigger asChild>
          <button onClick={toggle}>
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
