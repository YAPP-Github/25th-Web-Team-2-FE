'use client';

import * as Popover from '@radix-ui/react-popover';
import { ChangeEvent, useState } from 'react';
import Icon from '@/components/Icon';
import theme from '@/styles/theme';
import {
  ageButtonWrapper,
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
  subLabel,
} from './ContactTargetPopover.styles';

const GENDER = ['전체', '남자', '여자'] as const;

type Gender = (typeof GENDER)[number];

// TODO: gender와 age는 유저 정보에서 가져와 기본값으로 설정
const ContactTargetPopover = () => {
  const [gender, setGender] = useState<Gender>('전체');
  const [age, setAge] = useState(20);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [filteredGender, setFilteredGender] = useState<Gender>('전체');
  const [filteredAge, setFilteredAge] = useState(20);

  const handleChangeFilteredAge = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredAge(Number(e.target.value));
  };

  const handleIncreaseAge = () => {
    setFilteredAge((prev) => Math.min(100, prev + 1));
  };

  const handleDecreaseAge = () => {
    setFilteredAge((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setFilteredGender('전체');
    setFilteredAge(20);
  };

  const handleSave = () => {
    setAge(filteredAge);
    setGender(filteredGender);
    setIsSelected(true);
    setIsOpen(false);
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
        <span>{isSelected ? `${age}세 ${gender}` : '모집 대상'}</span>
        <Icon icon="Chevron" width={20} rotate={isOpen ? -180 : 0} cursor="pointer" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content css={popoverContent}>
          <div css={genderSelectWrapper}>
            <span css={label}>성별</span>
            <div css={buttonGroup}>
              {GENDER.map((gender) => (
                <button
                  key={gender}
                  className={gender === filteredGender ? 'active' : ''}
                  onClick={() => setFilteredGender(gender as Gender)}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
          <div css={ageSelectWrapper}>
            <div css={labelWrapper}>
              <span css={label}>나이</span>
              <span css={subLabel}>양력 기준 만 나이</span>
            </div>
            <div css={ageInputContainer}>
              <input type="number" value={filteredAge} onChange={handleChangeFilteredAge} />
              <div css={ageButtonWrapper}>
                <button onClick={handleDecreaseAge}>
                  <Icon
                    icon="ChevronSquare"
                    color={theme.colors.field04}
                    cursor="pointer"
                    rotate={180}
                  />
                </button>
                <button onClick={handleIncreaseAge}>
                  <Icon icon="ChevronSquare" color={theme.colors.field04} cursor="pointer" />
                </button>
              </div>
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

export default ContactTargetPopover;
