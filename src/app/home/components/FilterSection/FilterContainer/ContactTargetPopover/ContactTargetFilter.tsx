'use client';

import * as Popover from '@radix-ui/react-popover';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useState } from 'react';

import ContactTargetBottomSheet from './ContactTargetBottomSheet/ContactTargetBottomSheet';
import ContactTargetContent from './ContactTargetContent/ContactTargetContent';
import { popoverContent, popoverTrigger } from './ContactTargetFilter.css';

import { GenderFilterValue } from '@/app/home/home.types';
import { getContactTargetFilterText, getFilterColors } from '@/app/home/home.utils';
import useURLFilters from '@/app/home/hooks/useURLFilters';
import Icon from '@/components/Icon';
import useOverlay from '@/hooks/useOverlay';

interface ContactTargetFilterProps {
  filterGender?: GenderFilterValue;
  filterAge?: number;
}

const ContactTargetFilter = ({ filterGender, filterAge }: ContactTargetFilterProps) => {
  const { handleFilterChange } = useURLFilters();
  const { open, close } = useOverlay();
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = Boolean(filterAge) || Boolean(filterGender);

  const handleOpenBottomSheet = (e: React.TouchEvent) => {
    e.preventDefault();
    open(
      () => (
        <ContactTargetBottomSheet
          initialGender={filterGender || null}
          initialAge={filterAge?.toString() || ''}
          onChange={handleFilterChange}
          onClose={close}
        />
      ),
      { headerMode: 'title-close', title: '모집대상' },
    );
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger
        className={popoverTrigger}
        style={assignInlineVars(getFilterColors(isSelected))}
        onTouchEnd={handleOpenBottomSheet}
      >
        <span>{getContactTargetFilterText(filterAge, filterGender)}</span>
        <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={popoverContent} align="start">
          <ContactTargetContent
            initialGender={filterGender}
            initialAge={filterAge}
            onChange={handleFilterChange}
            onClose={() => setIsOpen(false)}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ContactTargetFilter;
