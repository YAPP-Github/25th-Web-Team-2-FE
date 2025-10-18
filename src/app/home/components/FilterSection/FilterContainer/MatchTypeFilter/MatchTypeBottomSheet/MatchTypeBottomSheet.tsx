import { useState } from 'react';

import { matchOptionItem, matchOptionList } from './MatchTypeBottomSheet.css';

import { MATCH_TYPE_OPTIONS } from '@/app/home/home.constants';
import { MatchType } from '@/app/join/JoinPage.types';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface MatchTypeBottomSheetProps {
  onChange: (value: MatchType) => void;
  onClose: () => void;
  initialValue?: MatchType;
}

const MatchTypeBottomSheet = ({ initialValue, onChange, onClose }: MatchTypeBottomSheetProps) => {
  const [selectedValue, setSelectedValue] = useState<MatchType | undefined>(initialValue);

  const handleConfirm = () => {
    if (!selectedValue) {
      onClose();
      return;
    }

    onChange(selectedValue);
    onClose();
  };

  return (
    <div>
      <ul className={matchOptionList}>
        {MATCH_TYPE_OPTIONS.map((option) => (
          <li key={option.value}>
            <button
              className={matchOptionItem}
              onClick={() => setSelectedValue(option.value)}
              style={{
                color: selectedValue === option.value ? colors.primaryMint : colors.text06,
              }}
            >
              {option.label}
              {selectedValue === option.value && (
                <Icon icon="Check" width={24} height={24} color={colors.primaryMint} />
              )}
            </button>
          </li>
        ))}
      </ul>
      <Button variant="primary" size="small" onClick={handleConfirm}>
        저장
      </Button>
    </div>
  );
};

export default MatchTypeBottomSheet;
