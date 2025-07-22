import { ChangeEvent, useState } from 'react';

import {
  ageInput,
  ageInputContainer,
  ageSelectWrapper,
  genderButton,
  genderButtonGroup,
  genderSelectWrapper,
  label,
  labelWrapper,
  footerButtonContainer,
  resetButton,
  saveButton,
  contactTargetBottomSheetContainer,
} from './ContactTargetBottomSheet.css';

import { GENDER } from '@/app/home/home.constants';
import { GenderValue } from '@/app/home/home.types';
import Button from '@/components/Button/Button';

const AGE_MAX_LENGTH = 3;

interface ContactTargetBottomSheetProps {
  onChange: (filters: Record<string, string | string[] | number | null>) => void;
  onReset: () => void;
  onClose: () => void;
  initialGender: GenderValue | null;
  initialAge: string;
}

const ContactTargetBottomSheet = ({
  onChange,
  onReset,
  onClose,
  initialGender,
  initialAge,
}: ContactTargetBottomSheetProps) => {
  const [filteredGender, setFilteredGender] = useState<GenderValue | null>(initialGender);
  const [filteredAge, setFilteredAge] = useState(initialAge ?? '');

  const handleChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValidNumber = /^\d*$/.test(value);

    if (isValidNumber) {
      setFilteredAge(value);
    }
  };

  const handleReset = () => {
    setFilteredGender(null);
    setFilteredAge('');
    onReset();
  };

  const handleConfirm = () => {
    onChange({
      gender: filteredGender,
      age: filteredAge !== '' ? Number(filteredAge) : null,
    });
    onClose();
  };

  return (
    <div className={contactTargetBottomSheetContainer}>
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
            onChange={handleChangeAge}
            placeholder="만 나이 입력"
          />
        </div>
      </div>
      <div className={footerButtonContainer}>
        <Button variant="secondary" size="small" className={resetButton} onClick={handleReset}>
          초기화
        </Button>
        <Button variant="primary" size="small" className={saveButton} onClick={handleConfirm}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default ContactTargetBottomSheet;
