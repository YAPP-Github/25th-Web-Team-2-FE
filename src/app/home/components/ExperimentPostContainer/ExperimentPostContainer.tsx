'use client';

import ExperimentPostCardListContainer from './ExperimentPostCardListContainer/ExperimentPostCardListContainer';
import {
  filterWrapper,
  postContainerLayout,
  postContainerTitle,
  recruitCheckLabel,
} from './ExperimentPostContainer.css';
import FilterContainer from './FilterContainer/FilterContainer';
import useExperimentFilters from '../../hooks/useExperimentFilters';
import useUserInfo from '../../hooks/useUserInfo';

import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import Icon from '@/components/Icon';

const ExperimentPostContainer = () => {
  const { userInfo, isLoading: isUserInfoLoading, isSessionReady } = useUserInfo();

  const {
    filters,
    isRecruiting,
    handleFilterChange,
    handleToggleRecruitStatus,
    handleResetFilter,
  } = useExperimentFilters(isSessionReady, userInfo);

  return (
    <div className={postContainerLayout}>
      <h2 className={postContainerTitle}>공고를 확인해 보세요</h2>
      <div className={filterWrapper}>
        {/* 필터링 */}
        <FilterContainer
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleResetFilter={handleResetFilter}
        />

        {/* 모집 중인 공고만 보기 */}
        <JoinCheckbox
          labelClassName={recruitCheckLabel}
          label="모집 중인 공고만 보기"
          isChecked={isRecruiting}
          onChange={handleToggleRecruitStatus}
          isArrow={false}
          emptyCheckIcon={<Icon icon="CheckSquareFill" cursor="pointer" />}
        />
      </div>

      {/* 공고 목록 */}
      <ExperimentPostCardListContainer filters={filters} isUserInfoLoading={isUserInfoLoading} />
    </div>
  );
};

export default ExperimentPostContainer;
