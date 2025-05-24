'use client';

import * as Select from '@radix-ui/react-select';
import { useState } from 'react';

import { triggerWrapper, selectContent, selectList, selectItem } from './JoinSelect.css';

import { FilterOption } from '@/app/join/JoinPage.types';
import Icon from '@/components/Icon';

interface JoinSelectProps {
  placeholder: string;
  onChange: (value: string) => void;
  isError?: boolean;
  options?: FilterOption[];
  value?: string;
}

const JoinSelect = ({ placeholder, onChange, isError, options, value }: JoinSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select.Root value={value} onValueChange={onChange} onOpenChange={(open) => setIsOpen(open)}>
      <Select.Trigger className={triggerWrapper} aria-invalid={isError}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        {options && options.length > 0 && (
          <Select.Content className={selectContent} position="popper" sideOffset={-8}>
            <Select.Group className={selectList}>
              {options?.map((option) => (
                <Select.Item key={option.value} value={option.value} className={selectItem}>
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        )}
      </Select.Portal>
    </Select.Root>
  );
};

export default JoinSelect;
