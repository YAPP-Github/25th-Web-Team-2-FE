'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import { recentLoginTooltipContent } from './LastLoginTooltip.css';

import ArrowTooltip from '@/app/join/components/AreaTooltip/ArrowTooltip';
import { localStorageManager, STORAGE_KEYS } from '@/lib/localStorageManager';
import { LoginProvider, Role } from '@/types/user';

interface LastLoginTooltipProps {
  role: Role;
  provider: LoginProvider;
  side: 'top' | 'bottom';
}

const LastLoginTooltip = ({
  role,
  provider,
  side,
  children,
}: PropsWithChildren<LastLoginTooltipProps>) => {
  const [lastProvider, setLastProvider] = useState<LoginProvider | null>(null);

  useEffect(() => {
    const data = localStorageManager.get(STORAGE_KEYS.lastLogin);
    if (data?.role === role) setLastProvider(data.provider);
  }, [role]);

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root open={lastProvider === provider}>
        {children}
        <Tooltip.Portal>
          <Tooltip.Content
            className={recentLoginTooltipContent}
            side={side}
            sideOffset={8}
            align="start"
          >
            최근 로그인
            <Tooltip.Arrow asChild>
              <ArrowTooltip
                style={{ position: 'relative', transform: 'rotate(180deg)', top: '-1.5px' }}
              />
            </Tooltip.Arrow>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

const Trigger = ({ children }: { children: ReactNode }) => (
  <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
);

LastLoginTooltip.Trigger = Trigger;

export default LastLoginTooltip;
