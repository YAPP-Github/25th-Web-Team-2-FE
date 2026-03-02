'use client';

import * as Select from '@radix-ui/react-select';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useState } from 'react';

import { MatchType } from '@/types/filter';
import { ExperimentPostListFilters } from '@apis/post';
import Icon from '@components/Icon';
import { MATCH_TYPE_OPTIONS } from '@home/constants/filter';
import useURLFilters from '@home/hooks/useURLFilters';
import { getFilterColors } from '@home/utils/getFilterColors';
import { getMatchTypeLabel } from '@home/utils/getMatchTypeLabel';
import useOverlay from '@hooks/useOverlay';

import MatchTypeBottomSheet from './MatchTypeBottomSheet';
import { triggerWrapper, contentContainer, selectItem } from './MatchTypeFilter.css';

interface MatchTypeFilterProps {
  filters: ExperimentPostListFilters;
}

const MatchTypeFilter = ({ filters }: MatchTypeFilterProps) => {
  const { handleFilterChange } = useURLFilters();
  const { open, close } = useOverlay();
  const [isOpen, setIsOpen] = useState(false);

  const isSelected = Boolean(filters.matchType);

  const handleOpenBottomSheet = (e: React.TouchEvent) => {
    e.preventDefault();
    open(
      () => (
        <MatchTypeBottomSheet
          initialValue={filters.matchType}
          onChange={(value) => handleFilterChange({ matchType: value })}
          onClose={close}
        />
      ),
      { headerMode: 'title-close', title: '진행 방식' },
    );
  };

  return (
    <Select.Root
      value={filters.matchType ? filters.matchType : ''}
      onValueChange={(value) => handleFilterChange({ matchType: value as MatchType })}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <Select.Trigger
        className={triggerWrapper}
        style={assignInlineVars(getFilterColors(isSelected))}
        onTouchEnd={handleOpenBottomSheet}
      >
        <span>{getMatchTypeLabel(filters.matchType)}</span>
        <Select.Icon>
          <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={contentContainer} position="popper" sideOffset={6} align="start">
          <Select.Viewport>
            <Select.Group>
              {MATCH_TYPE_OPTIONS.map((option) => (
                <Select.Item key={option.value} value={option.value} className={selectItem}>
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default MatchTypeFilter;
