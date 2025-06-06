'use client';

import * as Select from '@radix-ui/react-select';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useState } from 'react';

import { triggerWrapper, contentContainer, selectItem } from './MatchTypeFilter.css';

import { ExperimentPostListFilters } from '@/apis/post';
import { getFilterColors } from '@/app/home/home.utils';
import Icon from '@/components/Icon';

const matchTypeMapper = { ALL: '전체', OFFLINE: '대면', ONLINE: '비대면' };
interface MatchTypeFilterProps {
  filters: ExperimentPostListFilters;
  onChange: (value: string) => void;
}

const MatchTypeFilter = ({ filters, onChange }: MatchTypeFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isSelected = Boolean(filters.matchType);

  const handleValueChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select.Root
      value={filters.matchType ? filters.matchType : ''}
      onValueChange={handleValueChange}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <Select.Trigger
        className={triggerWrapper}
        style={assignInlineVars(getFilterColors(isSelected))}
      >
        <span>{filters.matchType ? matchTypeMapper[filters.matchType] : '진행 방식'}</span>
        <Select.Icon>
          <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={contentContainer} position="popper" sideOffset={6} align="start">
          <Select.Viewport>
            <Select.Group>
              <Select.Item value="ALL" className={selectItem}>
                <Select.ItemText>전체</Select.ItemText>
              </Select.Item>
              <Select.Item value="OFFLINE" className={selectItem}>
                <Select.ItemText>대면</Select.ItemText>
              </Select.Item>
              <Select.Item value="ONLINE" className={selectItem}>
                <Select.ItemText>비대면</Select.ItemText>
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default MatchTypeFilter;
