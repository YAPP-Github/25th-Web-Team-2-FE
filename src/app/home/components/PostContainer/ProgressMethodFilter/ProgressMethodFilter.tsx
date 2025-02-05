'use client';

import * as Select from '@radix-ui/react-select';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useState } from 'react';

import { triggerWrapper, contentContainer, selectItem } from './ProgressMethodFilter.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface FilterOption {
  label: '전체' | '대면' | '비대면';
  value: 'ALL' | 'ONLINE' | 'OFFLINE';
}

const options: FilterOption[] = [
  { label: '전체', value: 'ALL' },
  { label: '대면', value: 'OFFLINE' },
  { label: '비대면', value: 'ONLINE' },
];

interface ProgressMethodFilterProps {
  onChange: (value: string) => void;
}

const ProgressMethodFilter = ({ onChange }: ProgressMethodFilterProps) => {
  const [selectedValue, setSelectedValue] = useState<FilterOption>(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleValueChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);

    if (!selectedOption) return;

    setSelectedValue(selectedOption);
    setIsSelected(true);
    onChange(value);
  };

  return (
    <Select.Root
      value={selectedValue.value}
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
        <span>{selectedValue.label}</span>
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
