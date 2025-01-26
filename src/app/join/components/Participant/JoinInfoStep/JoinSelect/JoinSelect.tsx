import * as Select from '@radix-ui/react-select';
import { useState } from 'react';

import { selectContent, selectItem, selectList, triggerWrapper } from './JoinSelect.styles';

import { FilterOption } from '@/app/join/JoinPage.types';
import Icon from '@/components/Icon';

interface JoinSelectProps {
  placeholder: string;
  onChange: (value: string) => void;
  options?: FilterOption[];
  value?: string;
}

const JoinSelect = ({ placeholder, onChange, options, value }: JoinSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select.Root value={value} onValueChange={onChange} onOpenChange={(open) => setIsOpen(open)}>
      <Select.Trigger css={triggerWrapper}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content css={selectContent} position="popper" sideOffset={4}>
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Group css={selectList}>
              {options?.map((option) => (
                <Select.Item key={option.value} value={option.value} css={selectItem}>
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default JoinSelect;
