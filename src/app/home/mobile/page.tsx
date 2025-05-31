'use client';

import Banner from '../components/Banner/Banner';
import ExperimentPostCardListContainer from '../components/ExperimentPostContainer/ExperimentPostCardListContainer/ExperimentPostCardListContainer';
import { recruitCheckLabel } from '../components/ExperimentPostContainer/ExperimentPostContainer.css';
import FilterContainer from '../components/ExperimentPostContainer/FilterContainer/FilterContainer';
import useExperimentFilters from '../hooks/useExperimentFilters';
import useUserInfo from '../hooks/useUserInfo';

import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

export default function MobileHomePage() {
  const { userInfo, isLoading: isUserInfoLoading } = useUserInfo();

  const {
    filters,
    isRecruiting,
    handleFilterChange,
    handleToggleRecruitStatus,
    handleResetFilter,
  } = useExperimentFilters(isUserInfoLoading, userInfo);

  return (
    <main>
      <header>헤더</header>
      <Banner />
      <div style={{ width: '100%', height: '12px', backgroundColor: '#ECEFF1' }}></div>
      <div style={{ padding: 16 }}>
        <FilterContainer
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleResetFilter={handleResetFilter}
        />
      </div>
      <JoinCheckbox
        labelClassName={recruitCheckLabel}
        label="모집 중인 공고만 보기"
        isChecked={isRecruiting}
        onChange={handleToggleRecruitStatus}
        emptyCheckIcon={<Icon icon="CheckSquareFill" cursor="pointer" color={colors.icon02} />}
      />

      {/* 공고 목록 */}
      <ExperimentPostCardListContainer filters={filters} isUserInfoLoading={isUserInfoLoading} />
    </main>
  );
}
