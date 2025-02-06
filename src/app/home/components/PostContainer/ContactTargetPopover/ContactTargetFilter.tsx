'use client';

import * as Popover from '@radix-ui/react-popover';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ChangeEvent, useEffect, useState } from 'react';

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

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const AGE_MAX_LENGTH = 3;
const genderLabelMapper = { MALE: '남성', FEMALE: '여성' };

const GENDER = [
  { label: '남성', value: 'MALE' },
  { label: '여성', value: 'FEMALE' },
] as const;

type Gender = (typeof GENDER)[number]['value'];

const getFilterText = (age?: number, gender?: Gender) => {
  if (age && gender) {
    return `${genderLabelMapper[gender]} · 만 ${age}세`;
  } else if (!age && gender) {
    return `${genderLabelMapper[gender]}`;
  } else if (age && !gender) {
    return `만 ${age}세 `;
  }
};

interface ContactTargetFilterProps {
  onChange: (key: string, value: string | number | null) => void;
  filterGender?: Gender;
  filterAge?: number;
}

const ContactTargetFilter = ({ onChange, filterGender, filterAge }: ContactTargetFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = Boolean(filterAge) || Boolean(filterGender);

  const [filteredGender, setFilteredGender] = useState<Gender | null>(null);
  const [filteredAge, setFilteredAge] = useState<number | null>(null);

  const handleChangeFilteredAge = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= AGE_MAX_LENGTH) {
      setFilteredAge(Number(e.target.value));
    }
  };

  const handleResetFilter = () => {
    setFilteredGender(null);
    setFilteredAge(null);
  };

  const handleSaveFilter = () => {
    setIsOpen(false);

    onChange('gender', filteredGender);
    onChange('age', filteredAge);
  };

  // 참여자 성별/나이 자동 필터링
  useEffect(() => {
    if (filterGender) {
      setFilteredGender(filterGender);
    }
  }, [filterGender]);

  useEffect(() => {
    if (filterAge) {
      setFilteredAge(filterAge);
    }
  }, [filterAge]);

  return (
    <Popover.Root open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <Popover.Trigger
        className={popoverTrigger}
        style={assignInlineVars({
          '--popover-trigger-color': isSelected ? colors.text01 : colors.text06,
          '--popover-trigger-bg': isSelected ? colors.field09 : colors.field01,
        })}
      >
        <span>{isSelected ? getFilterText(filterAge, filterGender) : '모집 대상'}</span>

        <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={popoverContent}>
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
                value={filteredAge ?? ''}
                type="number"
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
