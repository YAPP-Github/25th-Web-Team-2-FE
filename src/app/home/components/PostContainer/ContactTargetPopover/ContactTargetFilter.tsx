'use client';

import * as Popover from '@radix-ui/react-popover';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ChangeEvent, useState } from 'react';

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

const isEqualByKeys = (
  obj1: Record<string, string>,
  obj2: Record<string, string>,
  keys: string[],
) => {
  return keys.every((key) => obj1[key] === obj2[key]);
};

const INIT_GENDER = { label: '', value: '' } as const;
const INIT_AGE = 20;
const GENDER = [
  { label: '남성', value: 'MALE' },
  { label: '여성', value: 'FEMALE' },
] as const;

type Gender = (typeof GENDER)[number];

interface ContactTargetFilterProps {
  onChange: (key: string, value: string | number) => void;
}

// TODO: gender와 age는 유저 정보에서 가져와 기본값으로 설정
const ContactTargetFilter = ({ onChange }: ContactTargetFilterProps) => {
  const [gender, setGender] = useState<Gender | typeof INIT_GENDER>(INIT_GENDER);
  const [age, setAge] = useState(INIT_AGE);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [filteredGender, setFilteredGender] = useState<Gender | typeof INIT_GENDER>(INIT_GENDER);
  const [filteredAge, setFilteredAge] = useState(age);

  const handleChangeFilteredAge = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredAge(Number(e.target.value));
  };

  const handleReset = () => {
    setFilteredGender({ label: '', value: '' });
    setFilteredAge(INIT_AGE);
  };

  const handleSave = () => {
    setAge(filteredAge);
    setGender(filteredGender);
    setIsOpen(false);

    onChange('gender', filteredGender.value);
    onChange('age', filteredAge);

    const isInitCondition =
      filteredAge === INIT_AGE && isEqualByKeys(filteredGender, INIT_GENDER, ['label', 'value']);

    if (isInitCondition) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <Popover.Trigger
        className={popoverTrigger}
        style={assignInlineVars({
          '--popover-trigger-color': isSelected ? colors.text01 : colors.text06,
          '--popover-trigger-bg': isSelected ? colors.field09 : colors.field01,
        })}
      >
        <span>{isSelected ? `${age}세 ${gender.label}` : '모집 대상'}</span>
        <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={popoverContent}>
          <div className={genderSelectWrapper}>
            <span className={label}>성별</span>
            <div className={genderButtonGroup}>
              {GENDER.map((g) => (
                <button
                  key={g.value}
                  className={`${genderButton} ${g === filteredGender ? 'active' : ''}`}
                  onClick={() => setFilteredGender(g as Gender)}
                >
                  {g.label}
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
                onChange={handleChangeFilteredAge}
                placeholder="만 나이 입력"
              />
            </div>
          </div>
          <div className={footerButtonContainer}>
            <button onClick={handleReset} className={resetButton}>
              초기화
            </button>
            <button onClick={handleSave} className={saveButton}>
              저장
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ContactTargetFilter;
