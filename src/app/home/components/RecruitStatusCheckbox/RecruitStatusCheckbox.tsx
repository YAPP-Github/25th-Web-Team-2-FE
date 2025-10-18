'use client';

import { recruitCheckLabel, recruitCheckWrapper } from './RecruitStatusCheckbox.css';

import useURLFilters from '@/app/home/hooks/useURLFilters';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

const RecruitStatusCheckbox = () => {
  const { isRecruiting, handleToggleRecruitStatus } = useURLFilters();

  return (
    <div className={recruitCheckWrapper}>
      <JoinCheckbox
        labelClassName={recruitCheckLabel}
        label="모집 중인 공고만 보기"
        isChecked={isRecruiting}
        onChange={handleToggleRecruitStatus}
        emptyCheckIcon={<Icon icon="CheckSquareFill" cursor="pointer" color={colors.icon02} />}
      />
    </div>
  );
};

export default RecruitStatusCheckbox;
