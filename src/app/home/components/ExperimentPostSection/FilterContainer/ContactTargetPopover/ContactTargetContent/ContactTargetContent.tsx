'use client';

import { ChangeEvent, useState } from 'react';

import {
  genderSelectWrapper,
  ageSelectWrapper,
  labelWrapper,
  label,
  ageInputContainer,
  footerButtonContainer,
  resetButton,
  saveButton,
  ageInput,
  genderButton,
  genderButtonGroup,
} from './ContactTargetContent.css';

import { GENDER } from '@/app/home/home.constants';
import { GenderFilterValue } from '@/app/home/home.types';
import { ExperimentPostListFilterParams } from '@/types/filter';

const AGE_MAX_LENGTH = 3;

interface ContactTargetContentProps {
  initialGender?: GenderFilterValue;
  initialAge?: number;
  onChange: (filters: ExperimentPostListFilterParams) => void;
  onClose: () => void;
}

const ContactTargetContent = ({
  initialGender,
  initialAge,
  onChange,
  onClose,
}: ContactTargetContentProps) => {
  const [filteredGender, setFilteredGender] = useState<GenderFilterValue | null>(
    initialGender || null,
  );
  const [filteredAge, setFilteredAge] = useState<string | null>(initialAge?.toString() || null);

  const handleChangeFilteredAge = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValidNumber = /^\d*$/.test(value);

    if (isValidNumber) {
      setFilteredAge(value);
    }
  };

  const handleReset = () => {
    setFilteredGender(null);
    setFilteredAge(null);
  };

  const handleSave = () => {
    onChange({
      gender: filteredGender,
      age: filteredAge !== null ? Number(filteredAge) : null,
    });
    onClose();
  };

  return (
    <>
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
            value={filteredAge || ''}
            type="text"
            maxLength={AGE_MAX_LENGTH}
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
    </>
  );
};

export default ContactTargetContent;
