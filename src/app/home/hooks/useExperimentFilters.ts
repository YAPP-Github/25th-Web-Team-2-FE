import { useEffect, useState } from 'react';

import { calculateAgeFromBirthDate, filterParticipantInfo } from '../home.utils';

import { ParticipantResponse, ResearcherResponse } from '@/apis/login';
import { ExperimentPostListFilters } from '@/apis/post';

export const useExperimentFilters = (
  isLoadingUserInfo: boolean,
  userInfo?: ParticipantResponse | ResearcherResponse,
) => {
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

  const handleToggleRecruitStatus = () => {
    const toggleChecked = isRecruiting ? 'ALL' : 'OPEN';
    handleFilterChange('recruitStatus', toggleChecked);
  };

  const handleResetFilter = () => {
    setFilters({
      recruitStatus: 'ALL',
    });
  };

  useEffect(() => {
    if (!isLoadingUserInfo) return;

    // 참여자일 경우 자동 필터링 적용
    if (participantInfo) {
      setFilters((prev) => ({
        ...prev,
        recruitStatus: 'ALL',
        gender: participantInfo.gender,
        age: calculateAgeFromBirthDate(participantInfo.birthDate),
      }));

      return;
    }

    setFilters((prev) => ({
      ...prev,
      recruitStatus: 'ALL',
    }));
  }, [isLoadingUserInfo, participantInfo]);

  return {
    filters,
    isRecruiting,
    handleFilterChange,
    handleToggleRecruitStatus,
    handleResetFilter,
  };
};

export default useExperimentFilters;
