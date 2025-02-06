'use client';

import * as Select from '@radix-ui/react-select';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useState } from 'react';

import { triggerWrapper, contentContainer, selectItem } from './ProgressMethodFilter.css';

import { ExperimentPostListFilters } from '@/apis/post';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const matchTypeMapper = { ALL: '전체', OFFLINE: '대면', ONLINE: '비대면' };

interface ProgressMethodFilterProps {
  filters: ExperimentPostListFilters;
  onChange: (value: string) => void;
}

const ProgressMethodFilter = ({ filters, onChange }: ProgressMethodFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleValueChange = (value: string) => {
    setIsSelected(true);
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
        style={assignInlineVars({
          '--trigger-color': isSelected ? colors.text01 : colors.text06,
          '--trigger-bg': isSelected ? colors.field09 : colors.field01,
        })}
      >
        <span>{filters.matchType ? matchTypeMapper[filters.matchType] : '진행 방식'}</span>
        <Select.Icon>
          <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className={contentContainer}>
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
    </Select.Root>
  );
};

export default ProgressMethodFilter;
