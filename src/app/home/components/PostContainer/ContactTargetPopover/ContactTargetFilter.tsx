'use client';

import * as Popover from '@radix-ui/react-popover';
import { ChangeEvent, useState } from 'react';

import {
  ageInputContainer,
  ageSelectWrapper,
  buttonGroup,
  footerButtonContainer,
  genderSelectWrapper,
  label,
  labelWrapper,
  popoverContent,
  popoverTrigger,
  resetButton,
  saveButton,
} from './ContactTargetFilter.styles';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

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
        css={popoverTrigger}
        style={{
          color: isSelected ? theme.colors.text01 : theme.colors.text06,
          backgroundColor: isSelected ? theme.colors.field09 : theme.colors.field01,
        }}
      >
        <span>{isSelected ? `${age}세 ${gender.label}` : '모집 대상'}</span>
        <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content css={popoverContent}>
          <div css={genderSelectWrapper}>
            <span css={label}>성별</span>
            <div css={buttonGroup}>
              {GENDER.map((gender) => (
                <button
                  key={gender.value}
                  className={gender === filteredGender ? 'active' : ''}
                  onClick={() => setFilteredGender(gender as Gender)}
                >
                  {gender.label}
                </button>
              ))}
            </div>
          </div>
          <div css={ageSelectWrapper}>
            <div css={labelWrapper}>
              <span css={label}>나이</span>
            </div>
            <div css={ageInputContainer}>
              <input onChange={handleChangeFilteredAge} placeholder="만 나이 입력" />
            </div>
          </div>
          <div css={footerButtonContainer}>
            <button onClick={handleReset} css={resetButton}>
              초기화
            </button>
            <button onClick={handleSave} css={saveButton}>
              저장
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ContactTargetFilter;
