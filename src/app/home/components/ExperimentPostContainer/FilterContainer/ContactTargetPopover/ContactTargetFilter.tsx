'use client';

import * as Popover from '@radix-ui/react-popover';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ChangeEvent, useEffect, useState } from 'react';

import ContactTargetBottomSheet from './ContactTargetBottomSheet/ContactTargetBottomSheet';
import {
  genderSelectWrapper,
  ageSelectWrapper,
  popoverTrigger,
  popoverContent,
  labelWrapper,
  label,
  ageInputContainer,
  footerButtonContainer,
  resetButton,
  saveButton,
  ageInput,
  genderButton,
  genderButtonGroup,
} from './ContactTargetFilter.css';

import { GENDER } from '@/app/home/home.constants';
import { GenderValue } from '@/app/home/home.types';
import { getContactTargetFilterText, getFilterColors } from '@/app/home/home.utils';
import Icon from '@/components/Icon';
import useOverlay from '@/hooks/useOverlay';

const AGE_MAX_LENGTH = 3;

interface ContactTargetFilterProps {
  onChange: (key: string, value: string | number | null) => void;
  filterGender?: GenderValue;
  filterAge?: number;
}

const ContactTargetFilter = ({ onChange, filterGender, filterAge }: ContactTargetFilterProps) => {
  const { open, close } = useOverlay();
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = Boolean(filterAge) || Boolean(filterGender);

  const [filteredGender, setFilteredGender] = useState<GenderValue | null>(null);
  const [filteredAge, setFilteredAge] = useState('');

  const handleOpenBottomSheet = (e: React.TouchEvent) => {
    e.preventDefault();
    open(
      () => (
        <ContactTargetBottomSheet
          initialGender={filteredGender}
          initialAge={filteredAge}
          onReset={handleResetFilter}
          onChange={onChange}
          onClose={close}
        />
      ),
      { headerMode: 'title-close', title: '모집대상' },
    );
  };

  const handleChangeFilteredAge = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValidNumber = /^\d*$/.test(value);

    if (isValidNumber) {
      setFilteredAge(value);
    }
  };

  const handleResetFilter = () => {
    setFilteredGender(null);
    setFilteredAge('');
  };

  const handleSaveFilter = () => {
    setIsOpen(false);

    onChange('gender', filteredGender);
    onChange('age', filteredAge !== '' ? Number(filteredAge) : null);
  };

  // 참여자 성별/나이 자동 필터링
  useEffect(() => {
    if (filterGender) {
      setFilteredGender(filterGender);
    }
  }, [filterGender]);

  useEffect(() => {
    if (filterAge) {
      setFilteredAge(filterAge.toString());
    }
  }, [filterAge]);

  return (
    <Popover.Root open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
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
          <div className={genderSelectWrapper}>
            <span className={label}>성별</span>
            <div className={genderButtonGroup}>
              {GENDER.map((option) => (
                <button
                  key={option.value}
                  className={`${genderButton} ${option.value === filteredGender ? 'active' : ''}`}
                  onClick={() => setFilteredGender(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className={ageSelectWrapper}>
            <div className={labelWrapper}>
              <span className={label}>나이</span>
            </div>
            <div className={ageInputContainer}>
              <input
                className={ageInput}
                value={filteredAge}
                type="text"
                maxLength={AGE_MAX_LENGTH}
                onChange={handleChangeFilteredAge}
                placeholder="만 나이 입력"
              />
            </div>
          </div>
          <div className={footerButtonContainer}>
            <button onClick={handleResetFilter} className={resetButton}>
              초기화
            </button>
            <button onClick={handleSaveFilter} className={saveButton}>
              저장
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ContactTargetFilter;
