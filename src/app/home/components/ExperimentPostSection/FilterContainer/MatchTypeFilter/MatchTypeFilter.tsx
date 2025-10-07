import * as Select from '@radix-ui/react-select';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useState } from 'react';

import MatchTypeBottomSheet from './MatchTypeBottomSheet/MatchTypeBottomSheet';
import { triggerWrapper, contentContainer, selectItem } from './MatchTypeFilter.css';

import { ExperimentPostListFilters } from '@/apis/post';
import { MATCH_TYPE_OPTIONS } from '@/app/home/home.constants';
import { getFilterColors, getMatchTypeLabel } from '@/app/home/home.utils';
import { MatchType } from '@/app/join/JoinPage.types';
import Icon from '@/components/Icon';
import useOverlay from '@/hooks/useOverlay';

interface MatchTypeFilterProps {
  filters: ExperimentPostListFilters;
  onChange: (value: MatchType) => void;
}

const MatchTypeFilter = ({ filters, onChange }: MatchTypeFilterProps) => {
  const { open, close } = useOverlay();
  const [isOpen, setIsOpen] = useState(false);

  const isSelected = Boolean(filters.matchType);

  const handleOpenBottomSheet = (e: React.TouchEvent) => {
    e.preventDefault();
    open(
      () => (
        <MatchTypeBottomSheet
          initialValue={filters.matchType}
          onChange={onChange}
          onClose={close}
        />
      ),
      { headerMode: 'title-close', title: '진행 방식' },
    );
  };

  return (
    <Select.Root
      value={filters.matchType ? filters.matchType : ''}
      onValueChange={onChange}
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
