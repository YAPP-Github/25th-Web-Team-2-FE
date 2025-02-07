'use client';

import { useEffect, useState } from 'react';

import ExperimentPostCardListContainer from './ExperimentPostCardListContainer/ExperimentPostCardListContainer';
import {
  filterWrapper,
  postContainerLayout,
  postContainerTitle,
  recruitCheckLabel,
} from './ExperimentPostContainer.css';
import FilterContainer from './FilterContainer/FilterContainer';
import { calculateAgeFromBirthDate, filterParticipantInfo } from '../../home.utils';
import useUserInfo from '../../hooks/useUserInfo';

import { ExperimentPostListFilters } from '@/apis/post';
import JoinCheckbox from '@/app/join/components/JoinCheckboxContainer/JoinCheckbox/JoinCheckbox';
import Icon from '@/components/Icon';

const ExperimentPostContainer = () => {
  const { userInfo, isLoading: isUserInfoLoading } = useUserInfo();
  const participantInfo = filterParticipantInfo(userInfo);

  const [filters, setFilters] = useState<ExperimentPostListFilters>(
    {} as ExperimentPostListFilters,
  );

  const isRecruiting = filters.recruitStatus === 'OPEN';

  const handleFilterChange = (key: string, value: string | string[] | number | boolean | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChange = () => {
    const toggleChecked = isRecruiting ? 'ALL' : 'OPEN';
    handleFilterChange('recruitStatus', toggleChecked);
  };

  const handleResetFilter = () => {
    setFilters({
      recruitStatus: 'ALL',
    });
  };

  // 참여자 성별/나이 자동 필터링
  useEffect(() => {
    if (participantInfo) {
      setFilters((prev) => ({
        ...prev,
        recruitStatus: 'ALL',
        gender: participantInfo.gender,
        age: calculateAgeFromBirthDate(participantInfo.birthDate),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        recruitStatus: 'ALL',
      }));
    }
  }, [participantInfo]);

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
          onChange={handleChange}
          isArrow={false}
          emptyCheckIcon={<Icon icon="CheckSquareFill" />}
        />
      </div>

      {/* 공고 목록 */}
      <ExperimentPostCardListContainer filters={filters} isLoading={isUserInfoLoading} />
    </div>
  );
};

export default ExperimentPostContainer;
