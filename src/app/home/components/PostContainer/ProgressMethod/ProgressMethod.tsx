'use client';

import * as Select from '@radix-ui/react-select';
import Icon from '@/components/Icon';
import { useState } from 'react';
import theme from '@/styles/theme';
import { contentContainer, selectItem, triggerWrapper } from './ProgressMethod.styles';

const ProgressMethod = () => {
  const [value, setValue] = useState('전체');
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setIsSelected(true);
  };

  return (
    <Select.Root
      value={value}
      onValueChange={handleValueChange}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <Select.Trigger
        css={triggerWrapper}
        style={{
          color: isSelected ? theme.colors.text01 : theme.colors.text06,
          backgroundColor: isSelected ? theme.colors.field09 : theme.colors.field01,
        }}
      >
        <span>{value}</span>
        <Select.Icon>
          <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content css={contentContainer}>
        <Select.Viewport>
          <Select.Group>
            <Select.Item value="전체" css={selectItem}>
              <Select.ItemText>전체</Select.ItemText>
            </Select.Item>
            <Select.Item value="대면" css={selectItem}>
              <Select.ItemText>대면</Select.ItemText>
            </Select.Item>
            <Select.Item value="비대면" css={selectItem}>
              <Select.ItemText>비대면</Select.ItemText>
            </Select.Item>
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
};

export default ProgressMethod;
