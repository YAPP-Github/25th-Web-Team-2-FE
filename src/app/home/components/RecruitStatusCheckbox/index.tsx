'use client';


import Icon from '@components/Icon';
import useURLFilters from '@home/hooks/useURLFilters';
import JoinCheckbox from '@join/components/JoinCheckboxContainer/JoinCheckbox';
import { colors } from '@styles/colors';

import { recruitCheckLabel, recruitCheckWrapper } from './RecruitStatusCheckbox.css';

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
